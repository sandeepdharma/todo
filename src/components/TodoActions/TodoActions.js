import "./TodoActions.scss";
import { Button } from "antd";
const TodoActions = ({
  todoData,
  getUpdatedData,
  clearCompleted,
  showClearButton,
  itemsLeft
}) => {
  const showCheckedItemsOnly = () => {
    let data = todoData;
    const filteredData = data.filter(
      (element) => element.checkStatus === "checked"
    );
    getUpdatedData(filteredData);
  };

  const showAllItems = () => {
    getUpdatedData(todoData);
  };

  const showUnchekedItemsOnly = () => {
    let data = todoData;
    const filteredData = data.filter(
      (element) => element.checkStatus === "unchecked"
    );
    getUpdatedData(filteredData);
  };

  return (
    <div className="actions-container">
      <p className="actions-paragraph">{itemsLeft} items left</p>
      <div className="actions-buttons-container">
      <Button onClick={showAllItems}>All</Button>
      <Button onClick={showUnchekedItemsOnly}>Active</Button>
      <Button onClick={showCheckedItemsOnly}>Completed</Button>
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
};

export default TodoActions;
