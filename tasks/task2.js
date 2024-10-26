"Ваш код повинен зробити POST-запит до вказаного URL."
"Для створення нового користувача, передайте в запит наступні дані:"
"name: ваше ім’я"
"email: ваш email"
"Поверніть відповідь від сервера після створення користувача."

"https://jsonplaceholder.typicode.com/users - адреса куди робити запит"


const https = require('https');


function createUser(user) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(user);

    const options = {
      hostname: 'jsonplaceholder.typicode.com',
      path: '/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          resolve(parsedData);
        } catch (error) {
          reject("Помилка парсингу JSON відповіді");
        }
      });
    });

    req.on('error', (error) => {
      reject("Помилка запиту: " + error.message);
    });

    req.write(data);
    req.end();
  });
}

module.exports = createUser;


