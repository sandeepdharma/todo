import "./TodoEdit.scss";
import { Form, Input } from "antd";
const TodoEdit = ({ listItemData, setShowEditForm }) => {
  const formSubmitHandler = (e) => {
    listItemData.checkItem = e.listitem;
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
        <Form.Item name="listitem">
          <Input autoFocus size="large" defaultValue={listItemData.checkItem} />
        </Form.Item>
      </Form>
    </>
  );
};

export default TodoEdit;
