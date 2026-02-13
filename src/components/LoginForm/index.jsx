import { DatePicker, Form, Input, message } from "antd";
import "./index.css";
import calendar from "../../assets/calendar.png";
import person from "../../assets/person.png";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    // If form is valid, navigate
    navigate("/next-page"); // change to your next route
  };

  const nameRules = [
    { required: true, message: "Zəhmət olmasa adınızı daxil edin" },
    {
      max: 30,
      message: "Ad maksimum 30 simvol ola bilər",
    },
    {
      pattern: /^[A-ZÇƏĞİÖŞÜ][a-zçəğiöşü]*(?:-[A-ZÇƏĞİÖŞÜ][a-zçəğiöşü]*)?$/,
      message:
        "Ad yalnız hərflər ola bilər və yalnız bir '-' işarəsi istifadə edilə bilər",
    },
  ];

  const surnameRules = [
    { required: true, message: "Zəhmət olmasa soyadınızı daxil edin" },
    {
      max: 30,
      message: "Soyad maksimum 30 simvol ola bilər",
    },
    {
      pattern: /^[A-ZÇƏĞİÖŞÜ][a-zçəğiöşü]*(?:-[A-ZÇƏĞİÖŞÜ][a-zçəğiöşü]*)?$/,
      message:
        "Soyad yalnız hərflər ola bilər və yalnız bir '-' işarəsi istifadə edilə bilər",
    },
  ];

  // Automatically capitalize first letter
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    const capitalized =
      value.charAt(0).toUpperCase() + value.slice(1); // capitalize first letter
    form.setFieldsValue({ [field]: capitalized });
  };

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
        <Form.Item name="name" label={<span className="text-white text-[15px] font-medium">Ad</span>} rules={nameRules}>
          <Input
            placeholder="Adınızı daxil edin"
            prefix={<img src={person} alt="person" className="w-5 h-5 mr-2" />}
            onChange={(e) => handleInputChange(e, "name")}
          />
        </Form.Item>

        <Form.Item
          name="surname"
          label={<span className="text-white text-[15px] font-medium">Soyad</span>}
          rules={surnameRules}
        >
          <Input
            placeholder="Soyadınızı daxil edin"
            prefix={<img src={person} alt="person" className="w-5 h-5 mr-2" />}
            onChange={(e) => handleInputChange(e, "surname")}
          />
        </Form.Item>

        <Form.Item
          name="date"
          label={<span className="text-white text-[15px] font-medium">Doğum tarixi</span>}
          rules={[{ required: true, message: "Zəhmət olmasa tarixi seçin" }]}
        >
          <DatePicker
            className="w-full custom-datepicker"
            placeholder="gün.ay.il"
            suffixIcon={null}
            allowClear={false}
            inputRender={(props, ref) => (
              <div className="flex items-center">
                <img src={calendar} alt="calendar" className="w-5 h-5 mr-2" />
                <input
                  ref={ref}
                  {...props}
                  className="bg-[#2F4A73] text-white h-[50px] rounded-[15px] w-full px-2"
                />
              </div>
            )}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
