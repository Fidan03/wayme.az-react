import Header from '../../layout/header';
import {  DatePicker, Form, Input } from 'antd';
import './main.css';
import Wave from '../../componenets/wave/index';
import NextButton  from '../../componenets/nextButton/index';
import LoginCardHeader from '../../componenets/LoginCardHeader';

const onFinish = (values) => {
  console.log('Success:', values);
};

const Login = () => {
  const [form] = Form.useForm();

  return (
    <div className="bg-background min-h-screen flex flex-col">

      <Header />

      <div className="flex-1 relative flex justify-center items-center overflow-hidden">

        <div className="absolute bottom-0 left-0 w-full z-0">
          <Wave />
        </div>

        <div className="w-240 flex flex-col justify-center items-center relative z-10">

          <div className="w-full inline-block p-0.5 rounded-[10px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">

            <div>
              <LoginCardHeader/>
            </div>


            <div className="bg-background rounded-b-[10px] p-6">

              <div className="mb-4 text-center flex items-start flex-col">
                <p className="text-white font-semibold text-lg text-[25px]">
                  Şəxsi məlumatlar
                </p>
                <p className="text-[#A2A8B2] text-[20px] font-semibold">
                  Zəhmət olmasa məlumatlarınızı düzgün daxil edin
                </p>
              </div>

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
                    className="text-white bg-[#2F4A73] rounded h-[50px]"
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
                    placeholder="00.00.0000"
                  />
                </Form.Item>

              </Form>

              <div>
                <NextButton />
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;
