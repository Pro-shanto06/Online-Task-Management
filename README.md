# TaskNest

TaskNest is an Online Task Management System that allows users to manage their tasks, deadlines, and projects effectively. It provides a user-friendly interface for task management, enabling users to create tasks, categorize them into different categories or projects, track task status, and much more.

## Key Features

- **User Registration and Authentication**: Users can securely register and log in to access their task lists.
  
- **Task Creation**: Users can create tasks by specifying a title, description, due date, and priority level.
  
- **Task Categories**: Tasks can be categorized into different categories or projects for better organization.
  
- **Task Lists**: Users can create and manage task lists or project-specific task boards.
  
- **Task Status Tracking**: Users can mark tasks as "To-Do," "In Progress," or "Completed" to track their progress.
  


## Tech Stack

- **Frontend**: React.js, Redux (RTK Query)
  
- **Backend**: Node.js, Express.js
  
- **Database**: MongoDB
  
- **Authentication**: JWT (JSON Web Tokens)
  
- **Styling**: CSS or a CSS framework like Tailwind, Bootstrap
  
- **Additional Libraries and Tools**: WebSocket for real-time updates, nodemon for server auto-restart, dotenv for environment variables.

# TaskNest Setup Process

## Step 1: Clone the Repository

git clone <repository_url>

## Step 2: Install Server Dependencies

cd server
npm install

## Step 3: Create Environment Variables File

echo "MONGO_URI=<your_mongodb_uri>" >> .env
echo "JWT_SECRET=<your_jwt_secret>" >> .env

## Step 4: Start the Server

npm start

## Step 5: Install Client Dependencies

cd ../client
npm install

## Step 6: Start the Client

npm run dev

# Once completed, you can access TaskNest in your web browser at the specified URL.

# For any assistance or queries, feel free to reach out to us.

# ---
# *This setup process is provided by [Your Name].*

