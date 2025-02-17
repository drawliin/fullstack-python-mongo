import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await axios.get("/api/tasks");
        setTasks(res.data);
    };

    const addTask = async () => {
        if (!title || !description) return;
        await axios.post("/api/tasks", { title, description });
        fetchTasks();
        setTitle("");
        setDescription("");
    };

    const deleteTask = async (id) => {
        await axios.delete(`/api/tasks/${id}`);
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
