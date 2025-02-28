import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState('');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


  // Fetch habits on page load
  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await axios.get(`${API_URL}/habits`);
      setHabits(response.data);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  // Add habit
  const addHabit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/habits`, { name });
      fetchHabits(); // Refresh the list
      setName('');
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  // Mark habit as completed
  const completeHabit = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/habits/${id}/complete`);
      const updatedHabit = response.data;
      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit._id === id ? { ...habit, completed: updatedHabit.completed } : habit
        )
      );
    } catch (error) {
      console.error('Error completing habit:', error);
    }
  };

  // Delete habit
  const deleteHabit = async (id) => {
    try {
      await axios.delete(`${API_URL}/habits/${id}`);
      fetchHabits(); // Refresh the list
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  return (
    <div className="App">
      <h1>Habit Tracker</h1>
      <form onSubmit={addHabit}>
        <input
          type="text"
          placeholder="Enter a new habit"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Add Habit</button>
      </form>
      <ul>
        {habits.map((habit) => (
          <li key={habit._id}>
            <span style={{ textDecoration: habit.completed ? 'line-through' : 'none' }}>
              {habit.name}
            </span>
            <button onClick={() => completeHabit(habit._id)}>
              {habit.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteHabit(habit._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;