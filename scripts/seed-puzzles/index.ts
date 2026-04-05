import { seedPuzzles } from './seed';
import { musicPuzzles } from './music-puzzles';
import { bookPuzzles } from './book-puzzles';

const START_DATE = '2026-04-03';

console.log(`Seeding puzzles starting from ${START_DATE}`);
console.log(`Music puzzles: ${musicPuzzles.length}`);
console.log(`Book puzzles: ${bookPuzzles.length}`);

await seedPuzzles(musicPuzzles, 'music', START_DATE, 100000);
await seedPuzzles(bookPuzzles, 'books', START_DATE, 200000);

console.log('\nDone! All puzzles seeded.');
