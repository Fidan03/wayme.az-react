import { DatePicker, Form, Input } from 'antd';
import './index.css';

const onFinish = (values) => {
  console.log('Success:', values);
};

const LoginForm = () => {
  const [form] = Form.useForm();

  return (
    <div>
      <Form
        name="loginForm"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        requiredMark={false}
      >

        <Form.Item
          name="name"
          label={
            <span className="text-white text-[15px] font-medium">
              Ad
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Zəhmət olmasa adınızı daxil edin',
            },
          ]}
        >
          <Input
            placeholder="Adınızı daxil edin"
            className="text-white bg-[#2F4A73]"
          />
        </Form.Item>

        <Form.Item
          name="surname"
          label={
            <span className="text-white text-[15px] font-medium">
              Soyad
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Zəhmət olmasa soyadınızı daxil edin',
            },
          ]}
        >
          <Input
            placeholder="Soyadınızı daxil edin"
            className="text-white bg-[#2F4A73]"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-white text-[15px] font-medium">
              Doğum tarixi
            </span>
          }
          name="date"
          rules={[
            {
              required: true,
              message: 'Zəhmət olmasa tarixi seçin',
            },
          ]}
        >
          <DatePicker
            className="w-full bg-[#2F4A73]"
            placeholder="gün.ay.il"
          />
        </Form.Item>

      </Form>
    </div>
  );
};

export default LoginForm;
