import React, { ChangeEvent, FC, useState } from "react";
import { FiX } from "react-icons/fi";
import { useTypedDispatch } from "../../../hooks/redux.ts";
import { addList, addTask } from "../../../store/slices/boardsSlice.ts";
import { v4 } from "uuid";
import { addLog } from "../../../store/slices/loggerSlice.ts";

type TDropDownFormProps = {
    boardId: string;
    listId: string;
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    list?: boolean;
}

const DropDownForm: FC<TDropDownFormProps> = ({
    boardId,
    list,
    listId,
    setIsFormOpen
}) => {
    const dispatch = useTypedDispatch();
    const [text, setText] = useState('');
    const formPlaceHolder = list ?
        "리스트의 제목을 입력하세요."
        :
        "일의 제목을 입력하세요.";

    const buttonTitle = list ?
        "리스트 추가하기"
        :
        "일 추가하기"

    const handlerTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    const handleButtonClick = () => {
        if(text) {
            if(list) {
                dispatch(
                    addList({
                        boardId,
                        list: {listId: v4(), listName: text, tasks: []}
                    })
                );

                dispatch(
                    addLog({
                        logId: v4(),
                        logMessage: `리스트 생성하기: ${text}`,
                        logAuthor: "User",
                        logTimeStamp: String(Date.now()),
                    })
                )
            } else {
                dispatch(
                    addTask({
                        boardId,
                        listId,
                        task: {
                            taskId: v4(),
                            taskName: text,
                            taskDescription: "",
                            taskOwner: "User"
                        }
                    })
                );

                dispatch(
                    addLog({
                        logId: v4(),
                        logMessage: `일 생성하기: ${text}`,
                        logAuthor: "User",
                        logTimeStamp: String(Date.now()),
                    })
                )

            }
        }
    }

    return (
        <div>
            <textarea
                value={text}
                onChange={handlerTextChange}
                autoFocus
                placeholder={formPlaceHolder}
                onBlur={() => setIsFormOpen(false)}
            />
            <div>
                <button onMouseDown={handleButtonClick}>
                    {buttonTitle}
                </button>
            </div>
        </div>
    )
}

export default DropDownForm
