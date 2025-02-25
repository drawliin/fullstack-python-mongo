import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4002/api';

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await axios.get(`${API_URL}/tasks`);
        setTasks(res.data);
    };

    const addTask = async () => {
        if (!title || !description) return;
        await axios.post(`${API_URL}/tasks`, { title, description });
        fetchTasks();
        setTitle("");
        setDescription("");
    };

    const deleteTask = async (id) => {
        await axios.delete(`${API_URL}/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {task.title} - {task.description}
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
