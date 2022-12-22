import { Checkbox, Typography } from "antd";
import "./TodoListItem.scss";
import { useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import TodoEdit from "../TodoEdit/TodoEdit";
import { MyContext } from "../../context";
const TodoListItem = ({
  listItemData,
  showClearButtonfunction,
  todoData,
}) => {
  const { Title } = Typography;
  const [showEditForm, setShowEditForm] = useState(false);
  const [checked, setChecked] = useState(false);

  const onChangeCheck = (listItemData, e,getFormData) => {
    let data = JSON.parse(localStorage.getItem("todoData"));
    data.forEach((element) => {
      if (element.id === listItemData.id) {
        if (e.target.checked) {
          element["checkStatus"] = "checked";
          setChecked(true);
        } else {
          element["checkStatus"] = "unchecked";
          setChecked(false);
        }
      }
    });
    localStorage.setItem("todoData", JSON.stringify(data));
    showClearButtonfunction(data);
    getFormData(data);
  };
  const editCheckItemHandler = () => {
    setShowEditForm(!showEditForm);
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

  return (
    <MyContext.Consumer>
      {({ deletelistItem,getFormData }) => {
        return (
          <div>
            <Checkbox
              checked={checked}
              className="checkbox-item"
              onChange={(e) => {
                onChangeCheck(listItemData, e,getFormData);
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
                    <Title
                      level={3}
                      className={
                        listItemData.checkStatus === "checked"
                          ? "checkbox-label-checked"
                          : "checkbox-label-unchecked"
                      }
                    >
                      {listItemData.checkItem}
                    </Title>
                  ) : (
                    <MyContext.Provider value={{listItemData,setShowEditForm}}>
                      <TodoEdit/>
                    </MyContext.Provider>
                  )}
                </div>
                <div className="icon-container">
                  <CloseOutlined
                    className="close-icon"
                    onClick={() => {
                      deletelistItem(listItemData, todoData, getFormData);
                    }}
                  />
                </div>
              </div>
            </Checkbox>
          </div>
        );
      }}
    </MyContext.Consumer>
  );
};

export default TodoListItem;
