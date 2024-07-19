import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('scraping_data.db');

export function initializeDatabase() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price TEXT,
        image TEXT,
        link TEXT
      )
    `);
  });
}

export function saveToDatabase(items) {
  db.serialize(() => {
    const stmt = db.prepare(`
      INSERT INTO products (name, price, image, link)
      VALUES (?, ?, ?, ?)
    `);

    items.forEach(item => {
      stmt.run(item.name, item.price, item.image, item.link);
    });

    stmt.finalize();
  });
}

export function closeDatabase() {
  db.close();
}
