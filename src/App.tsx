import { appContainer, board, buttons } from "./App.css.ts";
import BoardList from "./components/BoardList/BoardList.tsx";
import { useState } from "react";

function App() {
    const [activeBoardId, setActiveBoardId] = useState('board-0');

  return (
    <>
      <div className={appContainer}>
          <BoardList
              activeBoardId={activeBoardId}
              setActiveBoardId={setActiveBoardId}
          />
          <div className={board}>

          </div>

          <div className={buttons}>
              <button>
                  이 게시판 삭제하기
              </button>
              <button>
                  황동 목록 보이기
              </button>
          </div>
      </div>
    </>
  )
}

export default App
