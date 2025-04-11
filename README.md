# User Statistics Dashboard

A user statistics dashboard based on the PERN stack. It is to be integrated into NoSQLConcepts tool, and displays, the users' task completions, and task analytics.

## Dependencies

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
   \c user_task
   ```
   Run the database.sql code in the terminal (or insert your own data).

5. **Start Server and Application**
   ```bash
   node server.js
   ```
   Switch to a new terminal and cd into DBMS_Project_5/client
      ```bash
   npm start
   ```

## Frontend Components

### 1. `UserProfile.js`

**Purpose**: Displays basic user information.

**Props**:
- `userData`: Contains user details.

**Features**:
- Renders avatar, username, and user role.

**Dependencies**:
- Material-UI: `Typography`, `Avatar`, `Box`, `Chip`
- Icons: `PersonIcon`

---

### 2. `TaskCompletion.js`

**Purpose**: Displays task completion info grouped by areas and overall.

**Props**:
- `taskCompletions`: Array of task completion details.

**Features**:
- Groups tasks by area and calculates stats.
- Allows for sorting by difficulty, time, status, etc.
- Collapsible area sections.

**Dependencies**:
- Material-UI: `Table`, `Collapse`, `LinearProgress`
- Icons: `KeyboardArrowDownIcon`, `KeyboardArrowUpIcon`

---

### 3. `TaskAnalytics.js`

**Purpose**: Visualizes analytics data (time spent per assignment, difficulty rating per assignment).

**Props**:
- `taskAnalytics`: Array of analytics data.

**Features**:
- Displays:
  - Total Time Spent by User vs. Global Average per Assignment
  - Average Difficulty rating vs. Global Average per Assignment

**Dependencies**:
- Charting: `Recharts`
- Material-UI: `Grid`, `Paper`, `Typography`, `CircularProgress`

---

### 4. `UserPerformanceComponent.js`

**Purpose**: Main container integrating `UserProfile`, `TaskCompletion`, and `TaskAnalytics`.

**Props**:
- `username`: Username of the user whose data is fetched.

**Features**:
- Fetches user profile, task completions, and analytics from backend.
- Handles loading and error states.
- Displays the other components' contents.

**Dependencies**:
- Material-UI: `Container`, `Paper`, `Typography`, `CircularProgress`
- Custom: `UserProfile`, `TaskCompletion`, `TaskAnalytics`

---

## Backend API

### `GET /api/users/:username`

Fetches user profile data.

**Returns**:

```json
{
  "user_name": "alice",
  "role": "Regular User"
}
```

**Errors**:
- Failed to load user performance data

---

### `GET /api/users/:username/task-completions`

Fetches task completion details grouped by areas.

**Returns**: Array of tasks data (area name, statement, difficulty, time, etc.)

---

### `GET /api/users/:username/task-analytics`

Returns analytics on processing time and difficulty.

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
