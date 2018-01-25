//express_demo.js 文件
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

//app.configure(function () {
//    app.use(express.bodyParser({ keepExtensions: true, uploadDir: '/tmp' }));
//});

app.use(bodyParser.json());
 
app.get('/', function (req, res) {
   console.log(req);
   res.send('Hello World');
})


var tasks = [];

app.post('/createTask',function(req,res){
	console.log(req.body);
	tasks.push(req.body);
	res.send("OK I got a new Task");
});

app.get('/getTasks',function(req,res){
	res.send(tasks);
});

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
