# User Performance Dashboard

A user performance dashboard that provides insights into user profiles, task completions, and task analytics.

## 🛠 Tech Stack

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Charting**: Recharts

---

## Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/davott46/DBMS_Project_5.git
   ```
2. **Navigate to the Project Directory:**
   ```bash
   cd DBMS_Project_5
   ```
3. **Install Dependencies**
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```
4. **Setup Database**
   ```bash
   sudo -u postgres psql
   CREATE DATABASE user_task;
   \\c user_task
   ```
   Run the database.sql code in the terminal.

5. **Start Server and Application**
   ```bash
   node server.js
   cd ../client
   npm start
   ```

## 🧩 Frontend Components

### 1. `UserProfile.js`

**Purpose**: Displays basic user information (e.g., username and role).

**Props**:
- `userData`: Object containing user details (`user_name`).

**Features**:
- Renders avatar, username, and user role.

**Dependencies**:
- Material-UI: `Typography`, `Avatar`, `Box`, `Chip`
- Icons: `PersonIcon`

---

### 2. `TaskAnalytics.js`

**Purpose**: Visualizes analytics data (e.g., time spent, difficulty rating).

**Props**:
- `username`: Username for analytics query.

**Features**:
- Displays:
  - Time spent vs. global average
  - Difficulty rating vs. global average
- Handles loading and errors.

**Dependencies**:
- Charting: `Recharts`
- Material-UI: `Grid`, `Paper`, `Typography`, `CircularProgress`

---

### 3. `TaskCompletion.js`

**Purpose**: Displays detailed task completion info grouped by areas.

**Props**:
- `taskCompletions`: Array of task completion details.

**Features**:
- Groups tasks by area and calculates stats.
- Sorts by difficulty, time, status.
- Collapsible area sections.

**Dependencies**:
- Material-UI: `Table`, `Collapse`, `LinearProgress`
- Icons: `KeyboardArrowDownIcon`, `KeyboardArrowUpIcon`

---
### 4. `UserPerformanceComponent.js`

**Purpose**: Main container integrating `UserProfile`, `TaskCompletion`, and `TaskAnalytics`.

**Props**:
- `username`: Username of the user whose data is fetched.

**Features**:
- Fetches user profile, task completions, and analytics from backend.
- Handles loading and error states.
- Displays performance summary.

**Dependencies**:
- Material-UI: `Container`, `Paper`, `Typography`, `CircularProgress`
- Custom: `UserProfile`, `TaskCompletion`, `TaskAnalytics`

---

## 🔌 Backend API

### `GET /api/users/:username`

Fetches user profile data.

**Returns**:

```json
{
  "user_name": "JohnDoe",
  "role": "Admin"
}
```

**Errors**:
- Failed to load user performance data

---

### `GET /api/users/:username/task-completions`

Fetches task completion details grouped by areas.

**Returns**: Array of tasks with metadata (area name, statement, difficulty, time, etc.)

---

### `GET /api/users/:username/task-analytics`

Returns analytics on processing time and difficulty vs. global average.

**Sample**:

```json
{
  "totalProcessingTime": [
    {
      "area_id": 1,
      "area_name": "Postgres",
      "total_time": 120,
      "global_avg": 100
    }
  ],
  "averageDifficulty": [
    {
      "area_id": 1,
      "area_name": "Postgres",
      "personal_avg_diff": 3,
      "global_avg_diff": 2.5
    }
  ]
}
```

---

## 🗃️ Database Integration

- PostgreSQL used for querying:
  - `users` table for profiles
  - `task_statements` joined with `task_areas` for completions
  - SQL aggregations for analytics

---