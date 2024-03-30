import  { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteList } from '../../redux/reducers/listSlice';
import { createTask } from '../../redux/reducers/taskSlice';
import Task from '../task/task'; // Import the Task component
import './list.css';

const List = ({ list }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleDelete = (listId) => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      dispatch(deleteList(listId));
    }
  };

  const handleAddTask = async (listId) => {
    if (newTaskTitle.trim() !== '') {
      try {
        // Create new task
        await dispatch(createTask({ listId, title: newTaskTitle }));

        // Reset input and error state
        setNewTaskTitle('');
        setError(null);
      } catch (error) {
        setError(error.message || 'Error creating task');
      }
    } else {
      setError('Task title cannot be empty');
    }
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <h3>{list.title}</h3>
        <button onClick={() => handleDelete(list._id)}>Delete</button>
      </div>
      <p>Description: {list.description}</p>
      <div className="add-task">
        <input
          type="text"
          placeholder="Enter task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button onClick={() => handleAddTask(list._id)}>Add Task</button>
      </div>
      <div className="tasks">
        <h4>Tasks:</h4>
        <ul>
          {/* Render Task component for each task */}
          {list.tasks && list.tasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </ul>
      </div>
      {/* Display error if any */}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

List.propTypes = {
  list: PropTypes.object.isRequired,
};

export default List;
