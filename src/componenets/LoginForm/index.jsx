import { DatePicker, Form, Input } from "antd";
import "./index.css";
import calendar from "../../assets/calendar.png";
import person from "../../assets/person.png";

const onFinish = (values) => {
  console.log("Success:", values);
};

const LoginForm = () => {
  const [form] = Form.useForm();

  return (
    <div className="w-full">
      <Form
        name="loginForm"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        requiredMark={false}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Form.Item
          name="name"
          label={<span className="text-white text-[15px] font-medium">Ad</span>}
          rules={[
            { required: true, message: "Zəhmət olmasa adınızı daxil edin" },
          ]}
        >
          <Input
            placeholder="Adınızı daxil edin"
            prefix={<img src={person} alt="person" className="w-5 h-5 mr-2" />}
          />
        </Form.Item>

        <Form.Item
          name="surname"
          label={
            <span className="text-white text-[15px] font-medium">Soyad</span>
          }
          rules={[
            {
              required: true,
              message: "Zəhmət olmasa soyadınızı daxil edin",
            },
          ]}
        >
          <Input
            placeholder="Soyadınızı daxil edin"
            prefix={<img src={person} alt="person" className="w-5 h-5 mr-2" />}
          />
        </Form.Item>

        <Form.Item
          name="date"
          label={
            <span className="text-white text-[15px] font-medium">
              Doğum tarixi
            </span>
          }
          rules={[
            {
              required: true,
              message: "Zəhmət olmasa tarixi seçin",
            },
          ]}
        >
          <DatePicker
            className="w-full custom-datepicker"
            placeholder="gün.ay.il"
            suffixIcon={null}
            allowClear={false}
            prefix={
              <img src={calendar} alt="calendar" className="w-5 h-5 mr-2" />
            }
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
