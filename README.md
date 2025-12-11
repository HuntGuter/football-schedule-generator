# Football Schedule Generator ⚽

A custom algorithm for generating balanced football match schedules, built with JavaScript and React.

This project focuses on solving a real-world scheduling problem:  
creating a full round-robin league structure with **balanced home/away distribution**, minimal streaks, and customizable constraints.

---

## 🎯 Goal of the Project

To generate a complete, valid season schedule for a list of football teams while ensuring:

- No team plays too many **home** or **away** games in a row  
- No duplicated matchups  
- Balanced distribution across all rounds  
- Configurable options for streak limits, swap logic, and optimization  

This is a logic-heavy project demonstrating algorithmic problem-solving, data structures, and state management.

---

## ⚙️ Core Features

### 1. Round-robin match generation  
Every team plays against every other team exactly twice (home + away).

### 2. Home/Away balancing
Custom logic minimizes:

- long home streaks  
- long away streaks  
- unfair sequences  

### 3. Schedule optimization engine  
Includes functions to:

- flip home/away assignments  
- swap matches between rounds  
- evaluate schedule score  
- rebuild round structures  
- iterate improvements  

### 4. Debug & visualization tools  
React UI displays:

- matches per round  
- home/away charts  
- team-by-team streak analysis  

You can visually inspect every generated schedule.

---

## 🧠 Algorithms & Logic (Short Overview)

The project uses a multi-pass optimization system:

1. **Initial pair-map generation**  
   Creates valid base rounds.

2. **Score function**  
   Penalizes unwanted streaks (customizable threshold).

3. **Mutation operations**  
   - flipping games  
   - swapping matches  
   - shuffling weeks  

4. **Iterative improvement loop**  
   Runs thousands of iterations until the best possible schedule is found.

This mirrors approaches used in real-world sports scheduling (genetic search, simulated annealing, constraint satisfaction).

---

## 🛠 Tech Stack

- React  
- JavaScript (ES6+)  
- Vite  
- CSS  
- Custom algorithmic engines (no external libraries)

---

## 📁 Project Structure

src/

├── components/

│ ├── ScheduleTable.jsx

│ ├── TeamStats.jsx

│ └── Controls.jsx

├── logic/

│ ├── generateSchedule.js

│ ├── optimizeSchedule.js

│ ├── analyzeHomeAway.js

│ └── utils.js

├── App.jsx

├── App.css

└── index.jsx

## 🚀 How to Run the Project

```bash
npm install
npm run dev
```

📌 Future Improvements

- UI filters for streak visualization

- Export schedule to CSV/PDF

- Add scoring weights for different constraints

- Improve optimization heuristics

👤 Author

Mykyta Olshanskyi

Frontend Developer

GitHub: https://github.com/HuntGuter

LinkedIn: https://www.linkedin.com/in/huntguter/
