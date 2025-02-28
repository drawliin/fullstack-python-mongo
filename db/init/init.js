db = db.getSiblingDB('habitdb');

db.habits.insertMany([
    { name: 'Drink water', completed: false },
    { name: 'Exercise daily', completed: false },
    { name: 'Read a book', completed: false }
]);