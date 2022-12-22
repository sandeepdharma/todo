import "./TodoForm.scss";
import { Form, Input } from "antd";
import { v4 as uuid } from "uuid";
import { DownOutlined } from "@ant-design/icons";
import { MyContext } from "../../context";

const TodoForm = (
) => {
  const [todoform] = Form.useForm();
  const formSubmitHandler = (e,todoData,getFormData) => {
    if (e.input !== " ") {
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
      <MyContext.Consumer>
        {({
          todoData,
          getFormData,
          markFunctionHandler,
          showList,
          iconBlur,
        }) => {
          return (
            <Form
              className="form"
              form={todoform}
              onFinish={(e) => formSubmitHandler(e,todoData,getFormData)}
              onFinishFailed={(error) => {
                console.log({ error });
              }}
            >
              <Form.Item
                name="input"
                rules={[
                  {
                    required: true,
                    message: "Input Required",
                  },
                ]}
              >
                <Input
                  className="form-input"
                  autoFocus
                  size="large"
                  placeholder="What needs to be done?"
                  prefix={
                    showList === true ? (
                      <div className="empty-container">
                        <DownOutlined
                          className={
                            iconBlur === true ? "iconVisible" : "iconDisible"
                          }
                          onClick={markFunctionHandler}
                        />
                      </div>
                    ) : (
                      <div className="empty-container"></div>
                    )
                  }
                />
              </Form.Item>
            </Form>
          );
        }}
      </MyContext.Consumer>
    </div>
  );
};

export default TodoForm;
