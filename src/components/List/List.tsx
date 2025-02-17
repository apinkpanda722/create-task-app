import { GrSubtract } from "react-icons/gr";
import Task from "../Task/Task.tsx";
import ActionButton from "../ActionButton/ActionButton.tsx";
import { IList, ITask } from "../../types";
import { FC } from "react";
import { useTypedDispatch } from "../../hooks/redux.ts";
import { deleteList, setModalActive } from "../../store/slices/boardsSlice.ts";
import { addLog } from "../../store/slices/loggerSlice.ts";
import { v4 } from "uuid";
import { setModalData } from "../../store/slices/modalSlice.ts";
import { deleteButton, header, listName, listWrapper } from "./List.css.ts";
import { Droppable } from "react-beautiful-dnd";

type TListProps = {
    boardId: string;
    list: IList;
}

const List: FC<TListProps> = ({
    list,
    boardId
}) => {

    const dispatch = useTypedDispatch();

    const handleListDelete = (listId: string) => {
        dispatch(deleteList({ boardId, listId } ));
        dispatch(
            addLog({
                logId: v4(),
                logMessage: `리스트 삭제하기: ${list.listName}`,
                logAuthor: "User",
                logTimeStamp: String(Date.now())
            })
        )
    }

    const handleTaskChange = (
        boardId: string,
        listId: string,
        _taskId: string,
        task: ITask
    ) => {
        dispatch(setModalData({ boardId, listId, task }))
        dispatch(setModalActive(true))
    }

    return (
        <Droppable droppableId={list.listId}>
            {provided => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={listWrapper}>
                    <div className={header}>
                        <div className={listName}>{list.listName}</div>
                        <GrSubtract
                            className={deleteButton}
                            onClick={() => handleListDelete(list.listId)}
                        />
                    </div>
                    {list.tasks.map((task, index) => (
                        <div
                            onClick={() => handleTaskChange(boardId, list.listId, task.taskId, task)}
                            key={task.taskId}
                        >
                            <Task
                                taskName={task.taskName}
                                taskDescription={task.taskDescription}
                                boardId={boardId}
                                id={task.taskId}
                                index={index}
                            />
                        </div>
                    ))}
                    {provided.placeholder}
                    <ActionButton
                        boardId={boardId}
                        listId={list.listId}
                    />
                </div>
            )}
        </Droppable>
    )
}

export default List