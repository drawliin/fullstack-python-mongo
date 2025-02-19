from flask import Blueprint, request, jsonify
from database import collection
from bson import ObjectId

routes = Blueprint('routes', __name__)

@routes.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = list(collection.find())
    for task in tasks:
        task["_id"] = str(task["_id"])
    return jsonify(tasks)

@routes.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.json
    if "title" in data and "description" in data:
        task_id = collection.insert_one(data).inserted_id
        return jsonify({"_id": str(task_id)}), 201
    return jsonify({"error": "Invalid data"}), 400

@routes.route('/api/tasks/<task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.json
    collection.update_one({"_id": ObjectId(task_id)}, {"$set": data})
    return jsonify({"message": "Task updated successfully"})

@routes.route('/api/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    collection.delete_one({"_id": ObjectId(task_id)})
    return jsonify({"message": "Task deleted successfully"})
