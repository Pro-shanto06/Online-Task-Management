import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBoard } from '../../../redux/reducers/boardSlice';
import './createBoard.css'; 

const CreateBoard = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createBoard({ title }));
    setTitle(''); 
  };

  return (
    <div className="create-board-container">
      <h2>Create a New Board</h2>
      <form onSubmit={handleSubmit} className="create-board-form">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleInputChange}
          required
          className="create-board-input"
        />
        <button type="submit" className="create-board-button">Create Board</button>
      </form>
    </div>
  );
};

export default CreateBoard;
