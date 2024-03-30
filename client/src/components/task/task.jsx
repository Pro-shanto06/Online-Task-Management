
import PropTypes from 'prop-types';

const Task = ({ task }) => {
  return (
    <li key={task._id} className="task-card">
      <div>
        <strong>Title:</strong> {task.title}
      </div>
      <div>
        <strong>Description:</strong> {task.description || "N/A"}
      </div>
      <div>
        <strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
      </div>
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
};

export default Task;
