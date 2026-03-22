const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const PORT = 3000;
const UPLOAD_DIR = path.join(__dirname, 'uploads');

// Створюємо папку 'uploads', якщо її ще немає
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
}

const server = http.createServer((req, res) => {
    // Перевіряємо, чи це POST запит на правильний шлях
    if (req.method === 'POST' && req.url === '/upload') {
        const outputPath = path.join(UPLOAD_DIR, 'output_task2.txt');
        
        // Створюємо потік для запису файлу та потік для розпакування
        const writeStream = fs.createWriteStream(outputPath);
        const gunzip = zlib.createGunzip();

        // Вхідні дані (req) -> розпакування (gunzip) -> запис у файл (writeStream)
        req.pipe(gunzip).pipe(writeStream);

        writeStream.on('finish', () => {
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Файл для завдання 2 успішно отримано, розпаковано та збережено!');
        });

        writeStream.on('error', (err) => {
            console.error('Помилка запису файлу:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Помилка сервера при збереженні файлу.');
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Шлях не знайдено. Відправте POST запит на /upload');
    }
});

server.listen(PORT, () => {
    console.log(`Сервер для завдання 2 готовий приймати файли на порту ${PORT}...`);
});