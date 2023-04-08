//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { getApiData, getDbData } = require('./src/controllers/Dogs/saveApiData')
const { saveApiDataTemperaments } = require('./src/controllers/Temperaments/saveApiDataTemperament')
const port = process.env.PORT || 3001 

// Syncing all the models at once.
conn.sync({ force: false }).then( async () => {
  console.log('Db Connected')
  await getApiData();
  await getDbData();
  await saveApiDataTemperaments();
  server.listen(port, () => {
  console.log(`%s listening at ${port}`); // eslint-disable-line no-console
  });
}).catch((error) => {
  console.log(error);
});
