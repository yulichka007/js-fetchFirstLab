"Ваш код повинен зробити DELETE-запит до вказаного URL, де {userId} – це ID користувача, якого потрібно видалити."
"Поверніть статус відповіді сервера після видалення."

"https://jsonplaceholder.typicode.com/users - адреса куди робити запит"


const https = require('https');

function deleteUser(id) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'jsonplaceholder.typicode.com',
      path: `/users/${id}`,
      method: 'DELETE',
    };

    const req = https.request(options, (res) => {
      
      const statusCode = res.statusCode;

      res.on('data', () => {}); 

      res.on('end', () => {
       
        resolve({ status: statusCode });
      });
    });

    req.on('error', (error) => {
      reject("Помилка запиту: " + error.message);
    });

    req.end();
  });
}


deleteUser(1)
  .then(console.log)
  .catch(console.error);

module.exports = deleteUser;
