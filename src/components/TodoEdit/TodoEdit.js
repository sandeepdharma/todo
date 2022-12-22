import "./TodoEdit.scss";
import { Form, Input } from "antd";
import { MyContext } from "../../context";
const TodoEdit = () => {
  let data = JSON.parse(localStorage.getItem("todoData"));
  const formSubmitHandler = (e,getFormData,setShowEditForm,listItemData) => {
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
      <MyContext.Consumer>
        {({ getFormData,listItemData,setShowEditForm }) => {
          return (
            <Form
              className="form"
              onFinish={(e) => formSubmitHandler(e,getFormData,setShowEditForm)}
              onFinishFailed={(error) => {
                console.log({ error });
              }}
            >
              <Form.Item name="input">
                <Input
                  autoFocus
                  size="large"
                  defaultValue={listItemData.checkItem}
                />
              </Form.Item>
            </Form>
          );
        }}
      </MyContext.Consumer>
    </>
  );
};

export default TodoEdit;
