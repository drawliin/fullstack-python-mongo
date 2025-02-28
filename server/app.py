import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient(os.getenv("MONGO_URI", 'mongodb://localhost:27017/'))
db = client.habitdb
habits_collection = db.habits

# Routes
@app.route('/api/habits', methods=['GET'])
def get_habits():
    habits = list(habits_collection.find())
    for habit in habits:
        habit['_id'] = str(habit['_id'])  # Convert ObjectId to string
    return jsonify(habits)

@app.route('/api/habits', methods=['POST'])
def add_habit():
    data = request.json
    habit = {
        'name': data['name'],
        'completed': False
    }
    result = habits_collection.insert_one(habit)
    habit['_id'] = str(result.inserted_id)
    return jsonify(habit)

@app.route('/api/habits/<id>/complete', methods=['PUT'])
def complete_habit(id):
    habit = habits_collection.find_one({'_id': ObjectId(id)})
    if habit:
        new_status = not habit.get('completed', False)
        habits_collection.update_one({'_id': ObjectId(id)}, {'$set': {'completed': new_status}})
        return jsonify({'message': 'Habit status updated', 'completed': new_status})
    return jsonify({'message': 'Habit not found'}), 404

@app.route('/api/habits/<id>', methods=['DELETE'])
def delete_habit(id):
    habits_collection.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Habit deleted'})

port = os.getenv('PORT', 5000)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port)