import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('data.db');

export function initializeDatabase() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price TEXT,
        image TEXT,
        link TEXT UNIQUE
      )
    `);
  });

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_products_name ON products (name)
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_products_link ON products (link)
  `);
}

export function saveToDatabase(items) {
  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    const insertOrUpdateStmt = db.prepare(`
      INSERT INTO products (name, price, image, link)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(link) DO UPDATE SET
        name = excluded.name,
        price = excluded.price,
        image = excluded.image
    `);

    items.forEach(item => {
      insertOrUpdateStmt.run(item.name, item.price, item.image, item.link);
    });

    insertOrUpdateStmt.finalize();
    db.run('COMMIT');
  });
}

export function closeDatabase() {
  db.close();
}
