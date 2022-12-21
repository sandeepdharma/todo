import { Checkbox, Typography } from "antd";
import "./TodoListItem.scss";
import { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import TodoEdit from "../TodoEdit/TodoEdit";
const TodoListItem = ({
  listItemData,
  deletelistItem,
  showClearButtonfunction,
  todoData,
}) => {
  const { Title } = Typography;
  const [showEditForm, setShowEditForm] = useState(false);
  const [checked, setChecked] = useState(false);
  const onChangeCheck = (listItemData, e) => {
    if (e.target.checked) {
      listItemData["checkStatus"] = "checked";
      setChecked(true);
    } else {
      listItemData["checkStatus"] = "unchecked";
      setChecked(false);
    }
    showClearButtonfunction(todoData);
  };

  const checkstatus = () => {
    if (listItemData.checkStatus === "checked") {
      setChecked(true);
    } else {
      setChecked(false);
    }
    showClearButtonfunction(todoData);
  };
  useEffect(() => {
    checkstatus();
  });
  const editCheckItemHandler = (listItemData) => {
    setShowEditForm(!showEditForm);
  };

  return (
    <div>
      <Checkbox
        checked={checked}
        className="checkbox-item"
        onChange={(e) => {
          onChangeCheck(listItemData, e);
        }}
      >
        <div
          className="checkbox-inner-container"
          onDoubleClick={editCheckItemHandler}
        >
          <div
            className={
              listItemData.checkStatus === "checked"
                ? "overlinestyle"
                : "disableoverline"
            }
          >
            {showEditForm === false ? (
              <Title type="secondary" level={3} className="checkbox-label">
                {listItemData.checkItem}
              </Title>
            ) : (
              <TodoEdit listItemData={listItemData} setShowEditForm={setShowEditForm}/>
            )}
          </div>
          <div className="icon-container">
            <CloseOutlined
              className="close-icon"
              onClick={() => {
                deletelistItem(listItemData);
              }}
            />
          </div>
        </div>
      </Checkbox>
    </div>
  );
};

export default TodoListItem;
