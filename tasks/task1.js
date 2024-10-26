"Ваша функція повинна робити GET-запит до вказаного URL і отримати дані."
"Поверніть дані користувачів у форматі масиву"
"Дані мають включати такі поля, як id та name."

"https://jsonplaceholder.typicode.com/users - адреса куди робити запит"

const https = require('https');

function fetchUsers() {
  return new Promise((resolve, reject) => {
    https.get('https://jsonplaceholder.typicode.com/users', (response) => {
      let data = '';

      
      response.on('data', chunk => {
        data += chunk;
      });

      
      response.on('end', () => {
        try {
          
          const users = JSON.parse(data);

          
          const result = users.map(user => ({
            id: user.id,
            name: user.name
          }));

          resolve(result);
        } catch (error) {
          reject("Помилка парсингу JSON");
        }
      });
    }).on('error', error => {
      reject("Помилка отримання даних");
    });
  });
}

module.exports = fetchUsers;



