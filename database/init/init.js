// Connect to the database
db = db.getSiblingDB("crud_app");  // Set database name

// Create 'tasks' collection if it doesn't exist
if (!db.getCollectionNames().includes("tasks")) {
    db.createCollection("tasks");
}

// Insert default tasks (if they don't already exist)
if (db.tasks.countDocuments({}) === 0) {
    db.tasks.insertMany([
        { title: "Learn Flask", completed: false },
        { title: "Build a CRUD App", completed: false },
        { title: "Deploy with Docker", completed: false }
    ]);
}

// Create an index for faster searches (optional)
db.tasks.createIndex({ title: 1 });