const { Transform } = require('stream');

class UpperCaseStream extends Transform {
    _transform(chunk, encoding, callback) {
        // Перетворюємо отримані дані (буфер) на рядок і робимо літери великими
        const upperText = chunk.toString().toUpperCase();
        
        // Відправляємо змінені дані далі
        this.push(upperText);
        
        // Повідомляємо, що обробку цієї порції даних завершено
        callback();
    }
}

const upperStream = new UpperCaseStream();

console.log('Введіть текст (літери стануть великими, числа не зміняться). Для виходу натисніть Ctrl+C:');
// process.stdin - це те, що ти вводиш у консоль
// process.stdout - це вивід у консоль
process.stdin.pipe(upperStream).pipe(process.stdout);