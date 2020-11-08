import apiService from './view.service.js'

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: '序号',
        align: 'start',
        sortable: false,
        value: 'webId'
      },
      {text: '网站名称', value: 'webName'},
      {text: '网站地址', value: 'webUrl'},
      {text: '操作', value: 'actions'}
    ],
    // 网站列表
    webList: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    ifDateTable: true
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新增' : '编辑'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    toEmbed(val) {
      this.ifDateTable = false
      this.$router.push({name: 'reader-view-embed', params: {webUrl: val}})
    },
    // 查询网站分页
    initialize() {
      apiService.page().then(resp => {
        this.webList = resp.data.content
      })
    },

    editItem(item) {
      this.editedIndex = this.webList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.webList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.webList.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    // 保存新增的web网站
    save() {
      // 保存网站
      apiService.save(this.editedItem).then(resp => {
        // 重新查询网站分页
        this.initialize()
        // 关闭弹窗
        this.close()
      })
    }
  }
}