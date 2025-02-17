import { IList } from "../../types";
import { FC } from "react";
import List from "../List/List.tsx";
import ActionButton from "../ActionButton/ActionButton.tsx";
import { listsContainer } from "./ListsContainer.css.ts";

type TListContainerProps = {
    boardId: string;
    lists: IList[];
}

const ListsContainer: FC<TListContainerProps> = ({
    lists,
    boardId
}) => {
    return (
        <div className={listsContainer}>
            {
                lists && lists.map(list => (
                    <List
                        key={list.listId}
                        list={list}
                        boardId={boardId}
                    />
                ))
            }
            <ActionButton
                boardId={boardId}
                listId={""}
                list
            />
        </div>
    )
}
export default ListsContainer
