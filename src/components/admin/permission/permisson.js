import api from './permission.service.js'
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
    sysPermissions: [],
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
    // 进入当前携带的角色
    role: {
      roleName: '',
      roleId: ''
    },
    // 勾选中的数据
    selected: []
  }),
  created() {
    this.role.roleName = this.$route.params.roleName
    this.role.roleId = this.$route.params.roleId
    if (this.role.roleName == undefined) {
      this.initialize()
    } else {
      this.findPermissionByRole(this.role.roleName)
    }
  },
  methods: {
    initialize() {
      api.findAllUser().then(resp => {
        this.sysPermissions = resp.data
      })
    },
    // 通过角色名查询权限点集合
    findPermissionByRole(roleName) {
      api.findPermissionByRole(roleName).then(res => {
        this.sysPermissions = res.data
      })
    },
    editItem(item) {
      this.editedIndex = this.sysPermissions.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      const index = this.sysPermissions.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.sysPermissions.splice(index, 1)
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
        Object.assign(this.sysPermissions[this.editedIndex], this.editedItem)
      } else {
        this.sysPermissions.push(this.editedItem)
      }
      this.close()
    },
    // 同步权限点表 
    async syncPermission() {
      let res = await api.syncPermission()
      console.log(`syncPermission -> ${res.data}`)
      this.initialize()
    },
    // 查询未配置的权限点
    queryNonPermission() {
      api.findNonPermissionByRole(this.role.roleName).then(res => {
        console.log(`findNonPermissionByRole -> ${res.data}`)
        this.sysPermissions = res.data
      })
    },
    // 权限点批量写给指定角色（写角色权限表）
    async saveRolePermissionBatch() {
      let rolePermission = []
      this.selected.forEach(permission => {
        rolePermission.push({
          role: {
            id: this.role.roleId
          },
          permission: {
            id: permission.id
          }
        })
      })
      // await 用在异步方法中，让指定代码同步执行(即执行完了同步代码才能向后执行)
      let res = await api.addRolePermissionBatch(rolePermission)
      console.log(`addRolePermissionBatch -> ${res.data}`)
      // 重新查询所有未赋值的权限点
      this.queryNonPermission()
    }
  }
}