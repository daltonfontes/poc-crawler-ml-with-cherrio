import { initializeDatabase, closeDatabase } from './db.js';
import { scrapeAllPages } from './scrapper.js';

async function main() {
  try {

    initializeDatabase();

    await scrapeAllPages();

    console.log('Dados salvos!!');

  } catch (error) {
    console.error('Ocorreu um erro:', error);
  } finally {
    closeDatabase();
  }

}

main();
