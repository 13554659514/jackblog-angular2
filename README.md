# jackblog-angular2
[![Dependency Status](https://david-dm.org/jackhutu/jackblog-angular2.svg)](https://david-dm.org/jackhutu/jackblog-angular2) 
[![devDependency Status](https://david-dm.org/jackhutu/jackblog-angular2/dev-status.svg)](https://david-dm.org/jackhutu/jackblog-angular2#info=devDependencies)  


Jackblog 是使用 Node.js + MongoDB + 其它客户端框架开发的个人博客系统,前后端分离,仿简书模板.    
服务端有: [express 版](https://github.com/jackhutu/jackblog-api-express) , [koa 版](https://github.com/jackhutu/jackblog-api-koa)         
客户端有: [angular1.x 版](https://github.com/jackhutu/jackblog-angular1) , [angular2.x 版](https://github.com/jackhutu/jackblog-angular2) , [react redux 版](https://github.com/jackhutu/jackblog-react-redux) , [vue 版](https://github.com/jackhutu/jackblog-vue)    
移动端有: [react native 版](https://github.com/jackhutu/jackblog-react-native-redux), [ionic2.0 版](https://github.com/jackhutu/jackblog-ionic2)      
##### 此为客户端angular2.0版, 需要配合服务端使用. 

> 服务端任选一种, 请预先安装并启动服务端


## 开发

```
$ git clone git@github.com:jackhutu/jackblog-angular2.git
$ cd jackblog-angular2
$ npm install
$ gulp serve
```

## 打包  
 
```
$ gulp build 或 gulp serve:dist
```

## 线上布署
```
$ pm2 start process.json
```
可参考[利用git和pm2一键布署项目到vps](http://jackhu.top/article/55cd8e00c6e998b817a930c7)

## License
MIT
