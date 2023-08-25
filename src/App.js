import "./App.scss";
import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import TodoActions from "./components/TodoActions/TodoActions";
import { MyContext } from "./context.js";
function App() {
  const [todoData, setTodoData] = useState();
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
    var countfiltered = data.filter(function (element) {
      return element.checkStatus === "checked";
    }).length;
    if (countfiltered > 0) {
      setShowClearButton(true);
    } else {
      setShowClearButton(false);
    }
    let itemsReamin = data.length - countfiltered;
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
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("todoData"));
    setTodoData(data);
    setFilterData(data);
    if (data.length > 0) {
      setShowList(true);
    }
  }, []);
  return (
    <div className="main-container">
      <h1 className="title">todos list</h1>
      <div className="main-inside-container">
        <MyContext.Provider
          value={{
            iconBlur,
            showList,
            todoData,
            getFormData,
            markFunctionHandler,
            filterData,
            showClearButtonfunction,
            getUpdatedData,
            clearCompleted,
            showClearButton,
            itemsLeft,
          }}
        >
          <TodoForm />
          {showList === true ? (
            <>
              <TodoList />
              <TodoActions />
            </>
          ) : null}
        </MyContext.Provider>
      </div>
    </div>
  );
}

export default App;
