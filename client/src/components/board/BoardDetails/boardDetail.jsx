import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBoardDetails, clearBoardDetails } from '../../../redux/reducers/boardSlice';
import Header from '../../../components/board/header/boardHeader';
import { createList, fetchLists, deleteList } from '../../../redux/reducers/listSlice';
import List from '../../list/list'; 
import './boardDetail.css';

const BoardDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const boardDetails = useSelector((state) => state.board.boardDetails);
  const lists = useSelector((state) => state.list.lists);
  const [newListTitle, setNewListTitle] = useState('');

  useEffect(() => {
    dispatch(fetchBoardDetails(id));
    dispatch(fetchLists(id));
    return () => {
      dispatch(clearBoardDetails());
    };
  }, [dispatch, id]);

  const handleCreateList = () => {
    dispatch(createList({ boardId: id, title: newListTitle }));
    setNewListTitle(''); 
  };

  return (
    <div>
      <Header />
      {boardDetails ? (
        <div>
          <h2>{boardDetails.title}</h2>
          <p>Description: {boardDetails.description}</p>
          <div>
            <input
              type="text"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              placeholder="Enter list title"
            />
            <button onClick={handleCreateList}>Create List</button>
          </div>
          <h3>Lists:</h3>
          <ul>
            {lists.map(list => (
              <List
                key={list._id}
                list={list}
                onDelete={deleteList}
                
              />
            ))}
          </ul>

        
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BoardDetails;
