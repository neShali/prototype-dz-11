function fetchData(url) {
  // Имитация сетевого запроса с задержкой 2 сек.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Для примера будем эмулировать успешный и неуспешный запрос
      if (url.endsWith('/users')) {
        resolve([
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' }
        ]);
      } else if (url.match(/\/users\/\d+$/)) {
        resolve({ id: 1, name: 'Alice', age: 30 });
      } else {
        reject(new Error('404 Not Found'));
      }
    }, 2000);
  });
}

// Запрос №1: получаем список пользователей
fetchData('https://api.example.com/users')
  .then(users => {
    console.log('Список пользователей:', users);

    // Запрос №2: информация о первом пользователе
    const firstUserId = users[0].id;
    return fetchData(`https://api.example.com/users/${firstUserId}`);
  })
  .then(firstUserInfo => {
    console.log('Информация о первом пользователе:', firstUserInfo);
  })
  .catch(err => {
    // Обработка ЛЮБОЙ ошибки из всей цепочки
    console.error('Ошибка при загрузке данных:', err.message);
  });
