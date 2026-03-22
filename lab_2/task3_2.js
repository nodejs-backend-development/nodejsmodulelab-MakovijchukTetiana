const { Transform } = require('stream');

class StatsStream extends Transform {
    _transform(chunk, encoding, callback) {
        const text = chunk.toString();
        
        // Очищаємо від зайвих пробілів по краях для точного підрахунку
        const cleanText = text.trim();
        
        // Кількість символів
        const charCount = cleanText.length;
        
        // Рахуємо слова (розбиваємо по пробілах)
        const words = cleanText.split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;

        // Формуємо красивий вивід
        const result = `\n[Ваш текст]: ${cleanText}\n[Статистика]: Символів - ${charCount}, Слів - ${wordCount}\n\nВведіть ще текст: `;
        
        this.push(result);
        callback();
    }
}

const statsStream = new StatsStream();

console.log('Введіть текст для підрахунку статистики (Ctrl+C для виходу):');
process.stdin.pipe(statsStream).pipe(process.stdout);