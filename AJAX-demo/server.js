
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
    var m = fs.readFileSync('./db','utf8') //100
    string=string.replace('$$n$$',m)
    response.setHeader('Content-Type','text/html','charset=utf-8')
    response.write(string)
    response.end()
  }else if(pathNoQuery === '/count' && method.toUpperCase() ==='GET' ){
    response.statusCode = 200
    var m = fs.readFileSync('./db','utf8') 
    m =parseInt(m,10)
    var n = m + 1
    fs.writeFileSync('./db',n)
    response.setHeader('Content-Type','text/json','charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:8008')
    response.write(`
        {
          "count":"${n}"
        }
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

