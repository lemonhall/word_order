//express_demo.js 文件
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const https = require('https');
const queryString = require('querystring');
var sessions = {};
var access_token = "";

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



//取得access_token的方法，服务器启动即调用；
var getACCESS_TOKEN = function(){
//发送模板消息的文档地址：
//https://mp.weixin.qq.com/debug/wxadoc/dev/api/notice.html#%E6%A8%A1%E7%89%88%E6%B6%88%E6%81%AF%E7%AE%A1%E7%90%86
//接口地址：
//https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
var APPID = 'wx23fc9dddb1ec0f07';
var SECRET = 'ae1232214967e0d9e3d4949ae8a297c2';
var HOST = 'api.weixin.qq.com';
var PATH = '/cgi-bin/token?grant_type=client_credential&appid='+APPID+'&secret='+SECRET;


var OPTIONS = {
		host : HOST,
		path : PATH,
		method : 'GET',
};

	let wxReq = https.request(OPTIONS, (res) => {
			if(res.statusCode == 200){
				let json = '';
				res.on('data' , (data) => {
					json+=data;
				});
				res.on('end' , () => {
					console.log(json);
					json =JSON.parse(json);
					console.log(json);
					access_token = json.access_token;

				});
			}else{
				console.log("getACCESS_TOKEN---errCode:"+res.statusCode);
			}
		});
		wxReq.end();

}
//当即调用
getACCESS_TOKEN();


//发送消息
var sendTempleMessage = function(toUser,msg){
//发送模板消息的文档地址：
//https://mp.weixin.qq.com/debug/wxadoc/dev/api/notice.html#%E6%A8%A1%E7%89%88%E6%B6%88%E6%81%AF%E7%AE%A1%E7%90%86
//接口地址：
//https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=ACCESS_TOKEN
var HOST = 'api.weixin.qq.com';
var PATH = '/cgi-bin/message/wxopen/template/send?access_token='+access_token;

// touser	是	接收者（用户）的 openid
// template_id	是	所需下发的模板消息的id
// page	否	点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。
// form_id	是	表单提交场景下，为 submit 事件带上的 formId；支付场景下，为本次支付的 prepay_id
// data	是	模板内容，不填则下发空模板
// color	否	模板内容字体的颜色，不填默认黑色
// emphasis_keyword	否	模板需要放大的关键词，不填则默认无放大

const DATA = {
		touser : toUser,
		template_id : 'yVsHzvIMduPW2InrNQLA-oyf5JDO8i5I-hZh_O8xW84',
		form_id : '',
		data : 'a',
};

var OPTIONS = {
		host : HOST,
		path : PATH,
		method : 'POST',
};

	let wxReq = https.request(OPTIONS, (res) => {
			if(res.statusCode == 200){
				let json = '';
				res.on('data' , (data) => {
					json+=data;
				});
				res.on('end' , () => {
					console.log(json);
					json =JSON.parse(json);
					console.log(json);
					access_token = json.access_token;

				});
			}else{
				console.log("sendTempleMessage---errCode:"+res.statusCode);
			}
		});
		wxReq.end();

}


//得到openId的方法
app.get('/register',function(req,res){


const APPID = 'wx23fc9dddb1ec0f07';
const SECRET = 'ae1232214967e0d9e3d4949ae8a297c2';
const HOST = 'api.weixin.qq.com';
const PATH = '/sns/jscode2session?';

const DATA = {
		appid : APPID,
		secret : SECRET,
		js_code : '',
		grant_type : 'authorization_code',
};

const OPTION = {
		host : HOST,
		path : '',
		method : 'GET',
};
		let code = req.query.code;
		console.log("code: "+code );
		let otherRes = res;
		DATA.js_code = code;
		OPTION.path = PATH + queryString.stringify(DATA);
		let wxReq = https.request(OPTION, (res) => {
			if(res.statusCode == 200){
				let json = '';
				res.on('data' , (data) => {
					json+=data;
				});
				res.on('end' , () => {
					console.log(json);
					json =JSON.parse(json);
					let openId = json.openid;
					sessions[openId] = openId;
					console.log(openId);
					otherRes.type('application/json');
					otherRes.json({
						data : {'openId' : openId},
					});
					otherRes.status(200);
				});
			}
		});
		wxReq.end();
});

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
