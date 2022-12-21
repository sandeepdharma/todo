import "./App.scss";
import { useState } from "react";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import TodoActions from "./components/TodoActions/TodoActions";
let data = JSON.parse(localStorage.getItem("todoData"));
function App() {
  const [todoData, setTodoData] = useState(data);
  const [filterData, setFilterData] = useState([]);
  const [showList, setShowList] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);
  const [itemsLeft, setItemsLeft] = useState(0);
  const [mark, setMark] = useState(false);
  const [iconBlur, setIconBlur] = useState(false);

  const getFormData = (data) => {
    setTodoData(data);
    localStorage.setItem("todoData", JSON.stringify(data));
    setFilterData(data);
    if (data.length !== 0) {
      setShowList(true);
    } else {
      setShowList(false);
    }
  };
  const getUpdatedData = (data) => {
    setFilterData(data);
  };
  const clearCompleted = () => {
    let data = todoData.filter(function (a) {
      return a.checkStatus === "unchecked";
    });
    getFormData(data);
  };
  const showClearButtonfunction = (data) => {
    let checkedCount = 0;
    data.forEach((element) => {
      if (element.checkStatus === "checked") {
        checkedCount++;
      }
    });
    if (checkedCount > 0) {
      setShowClearButton(true);
    } else {
      setShowClearButton(false);
    }
    let itemsReamin = data.length - checkedCount;
    setItemsLeft(itemsReamin);
    if (data.length !== 0) {
      setShowList(true);
    }
  };
  const markFunctionHandler = () => {
    let status = "";
    if (mark === false) {
      status = "checked";
    } else {
      status = "uncheked";
    }
    let data = todoData;
    data.forEach((element) => {
      element.checkStatus = status;
    });
    getFormData(data);
    setShowClearButton(!showClearButton);
    setMark(!mark);
    setIconBlur(!iconBlur);
  };

  return (
    <div className="main-container">
      <TodoForm
        iconBlur={iconBlur}
        showList={showList}
        todoData={todoData}
        getFormData={getFormData}
        markFunctionHandler={markFunctionHandler}
      />
      {showList === true ? (
        <>
          <TodoList
            filterData={filterData}
            todoData={todoData}
            getFormData={getFormData}
            showClearButtonfunction={showClearButtonfunction}
          />
          <TodoActions
            todoData={todoData}
            getUpdatedData={getUpdatedData}
            filterData={filterData}
            clearCompleted={clearCompleted}
            showClearButton={showClearButton}
            itemsLeft={itemsLeft}
          />
        </>
      ) : null}
    </div>
  );
}

export default App;
