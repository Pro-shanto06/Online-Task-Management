# TaskNest

TaskNest is an Online Task Management System designed to help users effectively manage their tasks, deadlines, and projects. It offers a user-friendly interface with comprehensive features to streamline task management processes.

## Key Features

- **User Registration and Authentication**: Secure user registration and authentication system ensure data privacy and allow users to access their task lists securely.

- **Task Creation**: Users can create tasks with ease by providing details such as title, description, due date, and priority level.

- **Task Categories**: Tasks can be categorized into different categories or projects, enabling users to organize and manage tasks efficiently.

- **Task Lists**: Task lists or project-specific task boards facilitate the organization and management of tasks in a structured manner.

- **Task Status Tracking**: Users can track the status of tasks by marking them as "To-Do," "In Progress," or "Completed," providing visibility into task progress.

## Tech Stack

- **Frontend**: React.js, Redux (RTK Query)
  
- **Backend**: Node.js, Express.js
  
- **Database**: MongoDB
  
- **Authentication**: JWT (JSON Web Tokens)
  
- **Styling**: CSS or a CSS framework like Tailwind, Bootstrap
  
- **Additional Libraries and Tools**: WebSocket for real-time updates, nodemon for server auto-restart, dotenv for environment variables.

## Setup Process

1. **Clone the Repository**: 
git clone <repository_url>



2. **Install Server Dependencies**:
cd server
npm install



3. **Create Environment Variables File**:
Create a `.env` file in the server directory and add the following environment variables:
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>



4. **Start the Server**:
npm start



5. **Install Client Dependencies**:
cd ../client
npm install



6. **Start the Client**:
npm run dev
