# User Performance Dashboard

A user performance dashboard that provides insights into user profiles, task completions, and task analytics.

## 🛠 Tech Stack

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Charting**: Recharts

---

## 🧩 Frontend Components

### 1. `UserProfile.js`

**Purpose**: Displays basic user information (e.g., username and role).

**Props**:
- `userData`: Object containing user details (`user_name`).

**Features**:
- Renders avatar and username.
- Returns `null` if `userData` is not provided.

**Dependencies**:
- Material-UI: `Typography`, `Avatar`, `Box`, `Chip`
- Icons: `PersonIcon`

---

### 2. `UserPerformanceComponent.js`

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

### 3. `TaskAnalytics.js`

**Purpose**: Visualizes analytics data (e.g., time spent, difficulty rating).

**Props**:
- `username`: Username for analytics query.

**Features**:
- Fetches analytics data from backend.
- Displays:
  - Time spent vs. global average
  - Difficulty rating vs. global average
- Handles loading and errors.

**Dependencies**:
- Charting: `Recharts`
- Material-UI: `Grid`, `Paper`, `Typography`, `CircularProgress`

---

### 4. `TaskCompletion.js`

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
- 404 if user does not exist

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
      "area_name": "Math",
      "total_time": 120,
      "global_avg": 100
    }
  ],
  "averageDifficulty": [
    {
      "area_id": 1,
      "area_name": "Math",
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

## 🚀 Deployment

- **Frontend**: Netlify, Vercel (built via Webpack or CRA)
- **Backend**: Node.js on Heroku or AWS EC2

---

## 🔮 Future Enhancements

- Pagination for large datasets
- Authentication and authorization
- Improved error messaging
