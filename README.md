
# TODO-APP 🚀 

Manage your tasks and subtasks with this powerful Node.js backend. Check out the project functionalities, setup instructions, and API endpoints.

## 🔧 Local Setup
1. Clone the Repositry
```bash
git clone https://github.com/Muthu-kesavan/Assessment.git
````
2. change Directory
```bash
cd TODO-APP
````
3. Install the Dependencies
```bash
npm install
```
4. Start the server
```bash
npm start
````
- The application will be accessible at `http://localhost:5000`.

## 📚 API Endpoints

### User Endpoints

1. Create a User
POST `api/user/register`

2. Login the User
POST `api/user/login`

3. Get The User
Get `api/user/user/:id`

### Task Endpoints

1. Create a Task
POST `api/task/addtask`

2. Get all the tasks
GET `api/task/alltasks`

3. Get a Specific Task by filtering with (priority/due dates)
GET `api/task/alltasks?priority=0`

3. Update a Task
POST `api/task/update_task`

4. Delete a task
DELETE `api/task/deltask`

### SubTask Endpoints

1. Create a SubTask
POST `api/task/subtask`

2. Get all subtasks
GET `api/task/allsubtasks`

3. Get a Specifi SubTask by filtering with taskId
GET `api/task/allsubtasks?taskId=3`

4. Update a SubTask
POST `api/task/update_substask`

5. Delete a SubTask
DELETE `api/task/delsub_task`


## ⏰ Cron Jobs

1. Change Task Priority: Automatically adjusts priority based on due_date.

2. Voice Calling using Twilio: Calls users if a task passes its due_date, prioritized based on user priority (0, 1, 2).
