import apiService from "@/components/reader/blog/blog.service.js"
// import VueFroala from 'vue-froala-wysiwyg'
// var editor = new FroalaEditor('#example')
export default {
  data () {
    return {
      froalaConfig: {
        toolbarButtons: [
          "undo", "redo", "clearFormatting", "|", "bold", "italic", "underline", "strikeThrough", "|", "fontFamily","fontSize", "color", "|", "paragraphFormat", "align", "formatOL", "formatUL", "outdent", "indent", "quote", "-", "insertLink","insertImage", "insertVideo", "embedly", "insertFile", "insertTable", "|", "emoticons", "specialCharacters", "insertHR", "selectAll", "|", "print", "spellChecker", "help", "|", "fullscreen"
        ],
        placeholder: "请填写内容",
        language: "zh_cn", //国际化
        imageUploadURL: "http://i.froala.com/upload", //上传url
        fileUploadURL: "http://i.froala.com/upload", //上传url 更多上传介绍 请访问https://www.froala.com/wysiwyg-editor/docs/options
        quickInsertButtons: ["image", "table", "ul", "ol", "hr"], //快速插入项
        // toolbarVisibleWithoutSelection: true,//是否开启 不选中模式
        // disableRightClick: true,//是否屏蔽右击
        colorsHEXInput: false, //关闭16进制色值
        toolbarSticky: true, //操作栏是否自动吸顶
        zIndex: 1,
        events: {
          "froalaEditor.initialized": function () {
            // console.log('initialized')
          }
        },
        height: 400
        // width: 1000
      },
      froalaContent: "",
      // alert: false,
      // 查询到的文章集合
      articles: [],
      apiResult: "",
      // 提示框
      snackbar: false,
      // 标题
      article: {
        articleTitle: '',
        articleId: ''
      },
      tags: '',
      // 表单可见
      valid: false,
      // 表单验证
      nameRules: []
    }
  },
  created () {
    this.refresh()
  },
  methods: {
    // 删除文章 软删除
    deleteArticle (val) {
      apiService.delete({id: val.articleId}).then(() => {
        this.apiResult = `delete success === ${val.articleId}`
        this.refresh()
      })
    },
    // 编辑
    fillEditor (val) {
      this.froalaContent = this.$base64.decode(val.articleContent)
      this.article = {
        articleTitle: val.articleTitle,
        articleId: val.articleId
      }
    },
    // 提交
    submit () {
      let postPara = {
        articleTitle: this.article.articleTitle,
        articleContent: this.$base64.encode(this.froalaContent),
        articleTag1: "vue",
        articleAuthor: "rai",
        articleId: this.article.articleId
      }
      if (this.article.articleId) {
        // 页面保存了articleId 则为更新记录 否则为新增记录
        apiService.update(postPara).then(res => {
          this.apiResult = `submit success === ${res.data}`
          this.snackbar = true
          this.refresh()
        })
      } else {
        apiService.submit(postPara).then(res => {
          this.apiResult = `submit success === ${res.data}`
          this.snackbar = true
          this.refresh()
        })
      }
    },
    // 初始化页面
    refresh () {
      apiService.queryAll({curPage: 1, pageSize: 15}).then(res => {
        // this.froalaContent = this.$base64.decode(res.data[0].articleContent)
        this.articles = res.data.list
        this.reset()
      })
    },
    // 清空
    reset () {
      this.froalaContent = ''
      this.article = {}
    }
  }
}