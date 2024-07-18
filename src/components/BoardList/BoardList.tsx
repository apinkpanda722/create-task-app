import React, { FC, useRef, useState } from 'react'
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux.ts";
import SideForm from "./SideForm/SideForm.tsx";
import { FiLogIn, FiPlusCircle } from "react-icons/fi";
import { addButton, addSection, boardItem, boardItemActive, container, title } from "./BoardList.css.ts";
import clsx from "clsx";
import { GoSignOut } from "react-icons/go";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../../firebase.ts";
import { removeUser, setUser } from "../../store/slices/userSlice.ts";
import { useAuth } from "../../hooks/useAuth.ts";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

type TBoardListProps = {
    activeBoardId: string;
    setActiveBoardId: React.Dispatch<React.SetStateAction<string>>
}

const BoardList: FC<TBoardListProps> = ({
    activeBoardId,
    setActiveBoardId
}) => {
    const dispatch = useTypedDispatch();
    const { boardArray} = useTypedSelector(state => state.boards);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const { isAuth } = useAuth();

    const handleLogin = () => {
        signInWithPopup(auth, provider)
            .then(userCredential => {
                console.log(userCredential);
                dispatch(
                    setUser({
                        email: userCredential.user.email,
                        id: userCredential.user.uid
                    })
                )
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                dispatch(
                    removeUser()
                )
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const handleClick = () => {
        setIsFormOpen(!isFormOpen)
        inputRef.current?.focus();
    }

    return (
        <div className={container}>
            <div className={title}>
                게시판:
            </div>
            {boardArray.map((board, index) => (
                <div key={board.boardId}
                     onClick={() => setActiveBoardId(boardArray[index].boardId)}
                     className={
                        clsx(
                            {
                                [boardItemActive]:
                                boardArray.findIndex(b => b.boardId === activeBoardId) === index
                            },
                            {
                                [boardItem]:
                                boardArray.findIndex(b => b.boardId === activeBoardId) !== index
                            }
                        )
                     }
                >
                    <div>
                        {board.boardName}
                    </div>
                </div>
            ))}
            <div className={addSection}>
                {
                    isFormOpen
                        ?
                        <SideForm inputRef={inputRef} setIsFormOpen={setIsFormOpen} />
                        :
                        <FiPlusCircle className={addButton} onClick={handleClick} />
                }

                {
                    isAuth
                        ?
                        <GoSignOut className={addButton} onClick={handleSignOut} />
                        :
                        <FiLogIn className={addButton} onClick={handleLogin} />
                }

            </div>
        </div>
    )
}

export default BoardList
