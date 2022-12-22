import { List } from "antd";
import { useState } from "react";
import "./TodoList.scss";
import TodoListItem from "../TodoListItem/TodoListItem";
import { MyContext } from "../../context";

const TodoList = () => {
  const [updateState, setUpdateState] = useState(false);

  const deletelistItem = (e, todoData, getFormData) => {
    let data = todoData;
    let filter = data.findIndex((element) => {
      return element.id === e.id;
    });
    if (filter !== -1) {
      data.splice(filter, 1);
    }
    getFormData(data);
    setUpdateState(!updateState);
  };

  return (
    <MyContext.Consumer>
      {({ filterData, todoData, getFormData, showClearButtonfunction }) => {
        return (
          <div className="list">
            <List
              itemLayout="horizontal"
              dataSource={filterData}
              renderItem={(listItemData) => (
                <List.Item key={listItemData.id}>
                  <MyContext.Provider
                    value={{ deletelistItem, getFormData, todoData }}
                  >
                    <TodoListItem
                      listItemData={listItemData}
                      todoData={todoData}
                      showClearButtonfunction={showClearButtonfunction}
                    />
                  </MyContext.Provider>
                </List.Item>
              )}
            />
          </div>
        );
      }}
    </MyContext.Consumer>
  );
};

export default TodoList;
