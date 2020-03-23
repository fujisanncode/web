import api from './user.service.js'
export default {
  data: () => ({
    // 新增弹窗是否打开
    dialog: false,
    // 表格头定义
    headers: [{
        text: '名称',
        value: 'name',
        align: 'start'
      },
      {
        text: '备注',
        value: 'remark'
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
      },
      {
        text: '操作',
        value: 'actions',
        sortable: false
      }
    ],
    // 列表中数据
    sysUsers: [],
    editedIndex: -1,
    // 新增弹窗中对象
    editedItem: {
      name: '',
      password: ''
    },
    defaultItem: {
      name: '',
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    // 一个参数为当前值，两个参数new,old
    dialog(val) {
      // 如果为false，继续执行close；如果为true不管
      val || this.close()
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    // 页面初始化查询
    initialize() {
      api.findAllUser().then(resp => {
        this.sysUsers = resp.data
      })
    },
    // 编辑行
    editItem(item) {
      this.editedIndex = this.sysUsers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    // 删除行
    deleteItem(item) {
      const index = this.sysUsers.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.sysUsers.splice(index, 1)
    },
    // 关闭弹窗的动作
    close() {
      // 关闭弹窗重新查询
      this.dialog = false
      this.initialize()
      // 重置editItem为defaultItem
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    // 保存编辑项或者新增项
    save() {
      if (this.editedIndex > -1) {
        // 编辑行，将弹窗编辑的所有字段复制给表格行，并且方法返回表格行
        Object.assign(this.sysUsers[this.editedIndex], this.editedItem)
      } else {
        // 新增行editedIndex === -1
        api.saveUser(this.editedItem).then(res => {
          console.log(res.data)
          this.initialize()
        })
      }
      this.close()
    },
    // 通过用户名跳转到角色页面查询角色
    findRole(user) {
      console.log(user.name)
      // params不能用path跳转
      this.$router.push({
        name: 'index-admin-role',
        query: {
          name: user.name
        },
        params: {
          userName: user.name,
          userId: user.id
        }
      })
    }
  }
}