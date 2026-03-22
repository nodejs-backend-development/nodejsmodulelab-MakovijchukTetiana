const http = require('http');

const PORT = 3000;

// Створюємо сервер
const server = http.createServer((req, res) => {
    // Формуємо повну URL-адресу для коректного парсингу
    const baseURL = `http://${req.headers.host}`;
    const parsedUrl = new URL(req.url, baseURL);
    
    // Отримуємо значення параметра "name" з рядка запиту
    const nameValue = parsedUrl.searchParams.get('name');

    // Налаштовуємо заголовки відповіді (звичайний текст)
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

    // Перевіряємо наявність параметра та відправляємо відповідний результат
    if (nameValue) {
        res.end(`Hello ${nameValue}`);
    } else {
        res.end("You should provide name parameter");
    }
})

// Запускаємо сервер
server.listen(PORT, () => {
    console.log(`Сервер  успішно запущено!`);
    console.log(` Тест без параметра: http://localhost:${PORT}/`);
    console.log(` Тест із параметром: http://localhost:${PORT}/?name=Tetyana`);
});
