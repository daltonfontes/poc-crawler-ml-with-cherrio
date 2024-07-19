import { initializeDatabase, closeDatabase } from './db.js';
import { scrapeAllPages } from './scrapper.js';

async function main() {
  initializeDatabase();

  await scrapeAllPages();

  console.log('Dados salvos!!');
  closeDatabase();
}

main();
