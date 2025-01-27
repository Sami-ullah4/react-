import { useState, useEffect, useRef, useCallback } from "react";

function Habids() {
  const [habits, setHabits] = useState([]);
  const habitInputRef = useRef();

  // Load habits from localStorage on mount
  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(savedHabits);
  }, []);

  // Save habits to localStorage when they change
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // Add a new habit
  const addHabit = useCallback(() => {
    const habitName = habitInputRef.current.value.trim();
    if (habitName) {
      setHabits((prev) => [
        ...prev,
        { id: Date.now(), name: habitName, completed: false },
      ]);
      habitInputRef.current.value = "";
    }
  }, []);

  // Toggle habit completion
  const toggleCompletion = useCallback((id) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  }, []);

  return (
    <div>
      <h1>Habit Tracker</h1>
      <div>
        <input ref={habitInputRef} type="text" placeholder="Add a new habit" />
        <button onClick={addHabit}>Add Habit</button>
      </div>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            <label>
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => toggleCompletion(habit.id)}
              />
              {habit.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Habids;
