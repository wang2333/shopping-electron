import { useContext, useState } from "react";
import Context from "../context";
import { Modal } from "antd";
import { creatOrder } from "@/api/modules/order";
import { Button, Checkbox, Form, Input, Steps } from "antd";
const { Step } = Steps;

function Pay(props) {
  const { visible, setVisible } = props;
  const [curStep, setCurStep] = useState(0);
  const handleClose = () => {
    setVisible(false);
  };
  const handleSubmit = () => {
    creatOrder({
      tel: "13407313334",
      goods: {
        1100001: 1,
      },
      address: "43号机",
      // payChannel: "wechat",
      payChannel: "alipay",
    }).then((res) => {
      console.log(res);
    });
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    setCurStep(2);
  };

  return (
    <Modal
      title="支付"
      width={800}
      open={visible}
      footer={false}
      onCancel={handleClose}
      getContainer={() => document.getElementById("shop")}
      className="payModal"
      maskClosable={false}
    >
      <Steps current={curStep} style={{ marginBottom: 20 }}>
        <Step title="提交信息" />
        <Step title="支付" />
        <Step title="结果" />
      </Steps>
      {curStep === 0 && (
        <div className="step step1">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 10,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="手机号"
              name="tel"
              rules={[
                {
                  required: true,
                  message: "请输入手机号!",
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: "手机号格式不正确!",
                  validateTrigger: "onBlur",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="座位号"
              name="address"
              rules={[
                {
                  required: true,
                  message: "请输入座位号!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
              style={{ textAlign: "center" }}
            >
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </Modal>
  );
}

export default Pay;
