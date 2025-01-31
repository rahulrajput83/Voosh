import { useEffect, useState } from "react";
import { Draggable, DropResult, Droppable, DragDropContext } from "react-beautiful-dnd";
import style from '../styles/Home.module.css';

/* Task with drag and drop */
const DragDrop = ({ data, handleDelete, setReadOnly, setShowToDo, setSingleLoading, setSingleId, updateTaskCategory }) => {
  const [defaultData, setDefaultData] = useState([]);

  /* Function to drop the item to new category */
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    const newData = JSON.parse(JSON.stringify(defaultData));
    const sourceCardIndex = newData.findIndex(card => card.id === source.droppableId);
    const destCardIndex = newData.findIndex(card => card.id === destination.droppableId);
    if (sourceCardIndex !== destCardIndex) {
      const [movedItem] = newData[sourceCardIndex].components.splice(source.index, 1);
      newData[destCardIndex].components.splice(destination.index, 0, movedItem);
      updateTaskCategory(movedItem._id, destCardIndex);
    } else {
      const [movedItem] = newData[sourceCardIndex].components.splice(source.index, 1);
      newData[sourceCardIndex].components.splice(destination.index, 0, movedItem);
    }
    setDefaultData(newData);
  };

  useEffect(() => {
    if (data.length) {
      setDefaultData(data);
    }
  }, [data]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={style.taskCard}>
        {defaultData.length > 0 && (
          defaultData.map((card) => (
            <Droppable key={card.id} droppableId={card.id}>
              {(provided) => (
                <div
                  className={style.toDo}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className={style.taskTitle}>{card.title}</h2>
                  {card.components.length > 0 ? card.components.map((component, index) => (
                    <Draggable key={component._id} draggableId={component._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={style.item}
                        >
                          <span className={style.title}>{component.title}</span>
                          <span className={style.desc}>{component.desc}</span>
                          <span className={style.lastUpdate}>Created At: {component.createdAt}</span>
                          <div className={style.btnGroup}>
                            <button className={style.deleteBtn} onClick={() => { handleDelete(component._id); }}>
                              Delete
                            </button>
                            <button className={style.editBtn} onClick={() => { setReadOnly(false); setShowToDo(true); setSingleLoading(true); setSingleId(component._id); }}>
                              Edit
                            </button>
                            <button className={style.viewBtn} onClick={() => { setReadOnly(true); setShowToDo(true); setSingleLoading(true); setSingleId(component._id); }}>
                              View Details
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  )) : <div className={style.emptyState}>No tasks available</div>}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))
        )}
      </div>
    </DragDropContext>
  );
};

export default DragDrop;
