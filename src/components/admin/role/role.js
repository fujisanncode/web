import api from './role.service.js'
export default {
  data: () => ({
    dialog: false,
    headers: [{
        text: '名称',
        value: 'name',
        align: 'start'
      },
      {
        text: '创建人',
        value: 'createBy'
      },
      {
        text: '创建时间',
        value: 'createTime'
      },
      {
        text: '修改人',
        value: 'updateBy'
      },
      {
        text: '修改时间',
        value: 'updateTime'
      }
    ],
    sysRoles: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    // 当前用户
    user: {
      id: '',
      name: ''
    },
    // 勾选中的数据
    selected: []
  }),
  // 计算变量
  computed: {
    userExistFlag() {
      return this.user.name != undefined
    },
    toolBarTitle() {
      return this.user.name == undefined ? 'Role Manage' : `Role Manage - ${this.user.name}`
    },
    formTitle() {
      return this.editedIndex === -1 ? 'New Role' : 'Edit Role'
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  created() {
    this.user.name = this.$route.params.userName
    this.user.id = this.$route.params.userId
    if (this.user.name == undefined) {
      this.initialize()
    } else {
      this.findRoleByUser(this.user.name)
    }
  },
  methods: {
    initialize() {
      api.findAllUser().then(resp => {
        this.sysRoles = resp.data
      })
    },
    // 通过用户名查询角色集合
    findRoleByUser(userName) {
      api.findRoleByUser(userName).then(res => {
        this.sysRoles = res.data
      })
    },
    editItem(item) {
      this.editedIndex = this.sysRoles.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      const index = this.sysRoles.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.sysRoles.splice(index, 1)
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.sysRoles[this.editedIndex], this.editedItem)
      } else {
        // 新增行editedIndex === -1
        api.saveRole(this.editedItem).then(res => {
          console.log(res.data)
          this.initialize()
        })
      }
      this.close()
    },
    // 点击角色，跳转到其权限页面
    findPermission(item) {
      console.log(item.roleName)
      this.$router.push({
        name: 'index-admin-permission',
        params: {
          roleName: item.name,
          roleId: item.id
        }
      })
    },
    // 查询当前用户未配置的角色
    queryNonRole() {
      api.findNonRoleByUser(this.user.name).then(res => {
        console.log(`findNonRoleByUser -> ${res.data}`)
        this.sysRoles = res.data
      })
    },
    // 批量给用户指定角色（写用户角色表）
    async saveUserRoleBatch() {
      let userRole = []
      this.selected.forEach(role => {
        userRole.push({
          user: {
            id: this.user.id
          },
          role: {
            id: role.id
          }
        })
      })
      // await 用在异步方法中，让指定代码同步执行(即执行完了同步代码才能向后执行)
      let res = await api.addUserRoleBatch(userRole)
      console.log(`addUserRoleBatch -> ${res.data}`)
      // 重新查询所有未赋值的权限点
      let nonRoles = await api.findNonRoleByUser(this.user.name)
      if (nonRoles.data.length == 0) {
        this.selected.length = 0
        this.initialize()
      }
    }
  }
}