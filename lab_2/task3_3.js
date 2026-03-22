const { Transform } = require('stream');

class HighlightStream extends Transform {
    // Конструктор приймає об'єкт з налаштуваннями кольорів
    constructor(options) {
        super(options);
        this.keywords = options.keywords || {};
        this.numberColor = '\x1b[36m'; // Блакитний для чисел
        this.resetColor = '\x1b[0m';   // Скидання кольору до стандартного
    }

    _transform(chunk, encoding, callback) {
        let text = chunk.toString();

        // 1. Підсвічуємо всі числа блакитним
        text = text.replace(/\b(\d+)\b/g, `${this.numberColor}$1${this.resetColor}`);

        // 2. Підсвічуємо ключові слова відповідними кольорами
        for (const [word, color] of Object.entries(this.keywords)) {
            // Регулярний вираз для пошуку точного слова (без урахування регістру)
            const regex = new RegExp(`\\b(${word})\\b`, 'gi');
            text = text.replace(regex, `${color}$1${this.resetColor}`);
        }

        this.push(text);
        callback();
    }
}

// Налаштування для 10-го варіанту: слова та їхні ANSI-коди
const myKeywords = {
    'hello': '\x1b[32m', // Зелений
    'world': '\x1b[33m', // Жовтий
    'error': '\x1b[31m', // Червоний
    'node': '\x1b[35m'   // Фіолетовий
};

const highlightStream = new HighlightStream({ keywords: myKeywords });

console.log('Введіть текст. Спробуйте слова: hello, world, error, node та будь-які числа:');
process.stdin.pipe(highlightStream).pipe(process.stdout);