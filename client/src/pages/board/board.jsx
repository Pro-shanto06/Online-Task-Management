import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/board/header/boardHeader';
import CreateBoard from '../../components/board/createBoard/createBoard';
import BoardItem from '../../components/board/boardItem/boardItem';
import BoardDetails from '../../components/board/BoardDetails/boardDetail'; // Import the BoardDetails component
import { fetchBoards } from '../../redux/reducers/boardSlice';
import './board.css';

const Board = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.board.boards);
  const [selectedBoard, setSelectedBoard] = useState(null); // State to track the selected board

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleBoardItemClick = (board) => {
    setSelectedBoard(board); // Set the selected board when a board item is clicked
  };

  return (
    <div className="board-page">
      <Header />
      <div className="board-list">
      <CreateBoard />
        {boards.map((board) => (
          <BoardItem key={board._id} board={board} onClick={handleBoardItemClick} />
        ))}
      </div>
      {selectedBoard && <BoardDetails board={selectedBoard} />} {/* Render BoardDetails when a board is selected */}
    </div>
  );
};

export default Board;
