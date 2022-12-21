import { Checkbox, Typography } from "antd";
import "./TodoListItem.scss";
import { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
const TodoListItem = ({
  listItemData,
  deletelistItem,
  showClearButtonfunction,
  todoData,
}) => {
  const { Title } = Typography;

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

  return (
    <div>
      <Checkbox
        checked={checked}
        className="checkbox-item"
        onChange={(e) => {
          onChangeCheck(listItemData, e);
        }}
      >
        <div className="checkbox-inner-container"
        onDoubleClick={()=>console.log('double clik happened')}>
          <div
            className={
              listItemData.checkStatus === "checked"
                ? "overlinestyle"
                : "disableoverline"
            }
          >
            <Title type="secondary" level={3} className="checkbox-label">
              {listItemData.checkItem}
            </Title>
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
