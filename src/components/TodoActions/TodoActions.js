import "./TodoActions.scss";
import { Button } from "antd";
import { MyContext } from "../../context";
const TodoActions = () => {
  const showCheckedItemsOnly = (todoData, getUpdatedData) => {
    let data = todoData;
    const filteredData = data.filter(
      (element) => element.checkStatus === "checked"
    );
    getUpdatedData(filteredData);
  };
  const showAllItems = (todoData, getUpdatedData) => {
    getUpdatedData(todoData);
  };
  const showUnchekedItemsOnly = (todoData, getUpdatedData) => {
    let data = todoData;
    const filteredData = data.filter(
      (element) => element.checkStatus === "unchecked"
    );
    getUpdatedData(filteredData);
  };

  return (
    <MyContext.Consumer>
      {({
        todoData,
        getUpdatedData,
        clearCompleted,
        showClearButton,
        itemsLeft,
      }) => {
        return (
          <div className="actions-container">
            <p className="actions-paragraph">{itemsLeft} items left</p>
            <div className="actions-buttons-container">
              <Button onClick={() => showAllItems(todoData, getUpdatedData)}>
                All
              </Button>
              <Button
                onClick={() => showUnchekedItemsOnly(todoData, getUpdatedData)}
              >
                Active
              </Button>
              <Button
                onClick={() => showCheckedItemsOnly(todoData, getUpdatedData)}
              >
                Completed
              </Button>
            </div>
            <div className="actions-clear-button">
              {showClearButton === true ? (
                <div className="clear-button">
                  <Button onClick={clearCompleted}>Clear Completed</Button>
                </div>
              ) : null}
            </div>
          </div>
        );
      }}
    </MyContext.Consumer>
  );
};

export default TodoActions;
