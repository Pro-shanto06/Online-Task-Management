import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { deleteBoardRequest } from '../../../redux/reducers/boardSlice';
import './boardItem.css'; 

const BoardItem = ({ board }) => { // Remove onClick prop
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleDeleteClick = (event) => {
    event.stopPropagation(); // Stop event propagation to prevent navigating to board details page
    dispatch(deleteBoardRequest(board._id));
  };

  const handleCardClick = () => {
    // Navigate to the BoardDetails page with the board ID in the route
    navigate(`/board/${board._id}`); // Use navigate function
  };

  return (
    <div className="board-item" onClick={handleCardClick}>
      <div className="board-item-header">
        <h3>{board.title}</h3>
        <button onClick={handleDeleteClick} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

BoardItem.propTypes = {
  board: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default BoardItem;
