import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteBoardRequest } from '../../../redux/reducers/boardSlice';
import './boardItem.css'; 

const BoardItem = ({ board }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleDeleteClick = (event) => {
    event.stopPropagation(); 
    dispatch(deleteBoardRequest(board._id));
  };

  const handleCardClick = () => {
    navigate(`/board/${board._id}`);
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
