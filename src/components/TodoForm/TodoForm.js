import "./TodoForm.scss";
import { Form, Input } from "antd";
import { v4 as uuid } from "uuid";
import { DownOutlined } from "@ant-design/icons";
const TodoForm = ({ todoData, getFormData, markFunctionHandler }) => {
  const [todoform] = Form.useForm();

  const formSubmitHandler = (e) => {
    if(e.input !== " "){
      let newItem = [...todoData];
      newItem.push({
        id: uuid().slice(0, 3),
        checkItem: e.input,
        checkStatus: "unchecked",
      });
      todoform.resetFields();
      getFormData(newItem);
      localStorage.setItem("todoData", JSON.stringify(newItem));
    }
    
  };

  return (
    <div>
      <Form
        className="form"
        form={todoform}
        onFinish={(e) => formSubmitHandler(e)}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
      >
        <Form.Item
          name="input"
          
          rules={[
            {
              required: true,
              message:'Input Required',
            
            },
          ]}
        >
          <Input
            autoFocus
            size="large"
            placeholder="What needs to be done?"
            prefix={
              <DownOutlined className="icon" onClick={markFunctionHandler} />
            }
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default TodoForm;
