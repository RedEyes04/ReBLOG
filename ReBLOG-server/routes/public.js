const serve = require('../controller/serve')

module.exports = function (app) {
  // 获取已发布文章列表（state=1, classify=0）
  app.post('/public/articles', (req, res) => {
    // 强制只获取已发布文章
    req.body.state = 1
    req.body.classify = 0
    serve.getArticle(req, res)
  })

  // 获取单篇文章详情
  app.post('/public/article', (req, res) => {
    serve.gainArticle(req, res)
  })

  // 获取图库列表（classify=1, state=1）
  app.post('/public/gallery', (req, res) => {
    req.body.state = 1
    req.body.classify = 1
    serve.getArticle(req, res)
  })

  // 获取日记列表
  app.post('/public/diary', (req, res) => {
    serve.getDiaryPage(req, res)
  })

  // 获取文章评论
  app.post('/public/comments', (req, res) => {
    serve.getComment(req, res)
  })

  // 提交评论
  app.post('/public/comment', (req, res) => {
    serve.addComment(req, res)
  })

  // 点赞文章
  app.post('/public/praise', (req, res) => {
    serve.addPraise(req, res)
  })

  // 获取分组列表（文章/图库）
  app.post('/public/subsets', (req, res) => {
    serve.subset(req, res)
  })

  // 获取标签列表
  app.post('/public/labels', (req, res) => {
    serve.getLabel(req, res)
  })

  // 获取数据总览
  app.post('/public/overview', (req, res) => {
    serve.overview(req, res)
  })
}
