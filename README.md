# reporting-by-nodeJs
A machine tool feeding project on Node.Js

技术栈
Bootstrap+Ejs+Express.js+Sequelize+Mysql+KingView(OPC)+S7-1215(PLC)
技术栈参考链接：
Boostrap: http://v3.bootcss.com/getting-started/
Node.js: http://nodejs.cn/api/
Express: http://www.expressjs.com.cn/starter/installing.html
Sequelize: http://docs.sequelizejs.com/
EJS: https://github.com/mde/ejs
Mysql: https://dev.mysql.com/doc/
ES6: http://es6.ruanyifeng.com/


共7个脚本+1个主程序
运行：
node ./bin/www
babel-node ProcessDownTimeRecord.js ...

注：7个脚本程序需要用babel编译 PM2运行： 
pm2 start ./bin/www
pm2 start ProcessProductionRecord.js --interpreter ./node_modules/.bin/babel-node
