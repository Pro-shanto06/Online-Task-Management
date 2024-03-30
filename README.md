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

## Setup Process

1. Clone the repository:

git clone <repository_url>


2. Navigate to the server directory and install dependencies:

cd server
npm install


3. Create a `.env` file in the server directory and paste the following environment variables:

MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>


4. Start the server:

npm start
or
nodemon start


5. Navigate to the client directory and install dependencies:

cd ../client
npm install


6. Start the client:

npm run dev


Feel free to reach out to us for any assistance or queries.
