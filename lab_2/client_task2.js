const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

// Шлях до файлу, який ми будемо відправляти
const inputFilePath = path.join(__dirname, 'input_task2.txt');

// Автоматично створюємо тестовий файл, якщо його немає
if (!fs.existsSync(inputFilePath)) {
    fs.writeFileSync(inputFilePath, 'Це тестовий текст для завдання 2. Він буде стиснутий, відправлений по мережі, а потім розпакований на сервері.');
    console.log('Створено тестовий файл: input_task2.txt');
}

// Налаштування HTTP-запиту
const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/upload',
    method: 'POST',
    headers: {
        'Content-Encoding': 'gzip' // Повідомляємо сервер, що дані стиснуті
    }
};

// Створюємо запит
const req = http.request(options, (res) => {
    let responseData = '';
    
    // Отримуємо відповідь від сервера
    res.on('data', (chunk) => {
        responseData += chunk;
    });
    
    res.on('end', () => {
        console.log('Відповідь від сервера:', responseData);
    });
});

req.on('error', (e) => {
    console.error(`Помилка запиту (можливо, сервер не запущено): ${e.message}`);
});

// Створюємо потік читання та потік стиснення
const readStream = fs.createReadStream(inputFilePath);
const gzip = zlib.createGzip();

// Читання з файлу -> стиснення (gzip) -> відправка на сервер (req)
readStream.pipe(gzip).pipe(req);