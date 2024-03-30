import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/board/header/boardHeader';
import CreateBoard from '../../components/board/createBoard/createBoard';
import BoardItem from '../../components/board/boardItem/boardItem';
import BoardDetails from '../../components/board/BoardDetails/boardDetail'; 
import { fetchBoards } from '../../redux/reducers/boardSlice';
import { fetchLists } from '../../redux/reducers/listSlice'; 
import './board.css';

const Board = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.board.boards);
  const [selectedBoard, setSelectedBoard] = useState(null); 

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleBoardItemClick = (board) => {
    setSelectedBoard(board); 
    dispatch(fetchLists(board._id));
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
      {selectedBoard && <BoardDetails board={selectedBoard} />}
    </div>
  );
};

export default Board;
