import { List } from "antd";
import { useState } from "react";
import "./TodoList.scss";
import TodoListItem from "../TodoListItem/TodoListItem";

const TodoList = ({
  filterData,
  todoData,
  getFormData,
  showClearButtonfunction,
}) => {
  const [state, setState] = useState(false);
  const deletelistItem = (e) => {
    let data = todoData
    var filter = data.findIndex((element) => {
      return element.id === e.id;
    });
    if (filter !== -1) {
      data.splice(filter, 1);
    }
    getFormData(data);
    setState(!state);
    console.log('data :',data)
  };

  return (
    <div className="list">
      <List
        itemLayout="horizontal"
        dataSource={filterData}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <TodoListItem
              listItemData={item}
              todoData={todoData}
              deletelistItem={deletelistItem}
              showClearButtonfunction={showClearButtonfunction}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default TodoList;
