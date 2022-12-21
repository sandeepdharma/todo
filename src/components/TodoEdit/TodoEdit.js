import "./TodoEdit.scss";
import { Form, Input } from "antd";
const TodoEdit = ({ listItemData, setShowEditForm, getFormData }) => {
  let data = JSON.parse(localStorage.getItem("todoData"));
  const formSubmitHandler = (e) => {
    data.forEach((element) => {
      if (element.id === listItemData.id) {
        element.checkItem = e.input;
      }
    });
    getFormData(data);
    setShowEditForm(false);
  };

  return (
    <>
      <Form
        className="form"
        onFinish={(e) => formSubmitHandler(e)}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
      >
        <Form.Item name="input">
          <Input autoFocus size="large" defaultValue={listItemData.checkItem} />
        </Form.Item>
      </Form>
    </>
  );
};

export default TodoEdit;
