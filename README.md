# reporting-by-nodeJs
A machine tool feeding project on Node.Js

Bootstrap+Ejs+Express.js+Sequelize+Mysql+KingView(OPC)+S7-1215(PLC)


共7个脚本+1个主程序
运行：
node ./bin/www
babel-node ProcessDownTimeRecord.js ...

注：7个脚本程序需要用babel编译 发布例： 
pm2 start ./bin/www
pm2 start ProcessProductionRecord.js --interpreter ./node_modules/.bin/babel-node
