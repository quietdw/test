
var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var path = request.url 
  var query = ''
  if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')) }
  var pathNoQuery = parsedUrl.pathname
  var queryObject = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  if (path === '/') {
    var string = fs.readFileSync('./index.html','utf8')
    var account = fs.readFileSync('./db','utf8') //100
    string=string.replace('$$money$$',account)
    response.setHeader('Content-Type','text/html','charset=utf-8')
    response.write(string)
    response.end()
  }else if(pathNoQuery === '/pay' && method.toUpperCase() ==='GET' ){
    var account = fs.readFileSync('./db','utf8') 
    var newaccount = account -1
    fs.writeFileSync('./db',newaccount)
    response.setHeader('Content-Type','application/javascript')
    response.write(`
      ${queryObject.callback}.call(undefined,{
        'success':true,
        'money': `+newaccount+ `
      })
    `)
    response.end()
  }else{
    response.statusCode = 404
    response.write('网页走丢了')
    response.end()
  }

  /******** 代码结束，下面不要看 ************/

})

server.listen(port)
console.log('127.0.0.1:'+port)

