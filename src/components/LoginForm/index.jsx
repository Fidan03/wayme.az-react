import { DatePicker, Form, Input } from "antd";
import "./index.css";
import calendar from "../../assets/calendar.png";
import person from "../../assets/person.png";
import dayjs from "dayjs";

const LoginForm = ({ form }) => {
  const nameRules = [
    { required: true, message: "Zəhmət olmasa adınızı daxil edin" },
    { max: 30, message: "Maksimum 30 simvol" },
    {
      pattern: /^[A-Za-zÇƏĞİÖŞÜçəğiöşü]+(-[A-Za-zÇƏĞİÖŞÜçəğiöşü]+)?$/,
      message: "Yalnız hərflər və maksimum bir '-' icazəlidir",
    },
  ];

  const surnameRules = [
    { required: true, message: "Zəhmət olmasa soyadınızı daxil edin" },
    { max: 30, message: "Maksimum 30 simvol" },
    {
      pattern: /^[A-Za-zÇƏĞİÖŞÜçəğiöşü]+(-[A-Za-zÇƏĞİÖŞÜçəğiöşü]+)?$/,
      message: "Yalnız hərflər və maksimum bir '-' icazəlidir",
    },
  ];

  const savedData = JSON.parse(localStorage.getItem("loginData") || "{}");

  const formatInput = (value) => {
    let val = value.replace(/[^A-Za-zÇƏĞİÖŞÜçəğiöşü-]/g, "");
    const parts = val.split("-");
    if (parts.length > 2) val = parts[0] + "-" + parts[1];
    val = val.slice(0, 30);
    if (val.length > 0) val = val.charAt(0).toUpperCase() + val.slice(1);
    return val;
  };

  const handleChange = (e, field) => {
    const formatted = formatInput(e.target.value);
    form.setFieldsValue({ [field]: formatted });
    const currentData = JSON.parse(localStorage.getItem("loginData") || "{}");
    localStorage.setItem(
      "loginData",
      JSON.stringify({ ...currentData, [field]: formatted })
    );
  };

  const handleDateChange = (date) => {
    if (!date || !dayjs.isDayjs(date)) return;
    form.setFieldsValue({ date });
    const formatted = date.format("DD.MM.YYYY");
    const currentData = JSON.parse(localStorage.getItem("loginData") || "{}");
    localStorage.setItem(
      "loginData",
      JSON.stringify({ ...currentData, date: formatted })
    );
  };

  return (
    <div className="w-full">
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
        initialValues={{
          name: savedData.name || "",
          surname: savedData.surname || "",
          date: null,
        }}
      >
        <Form.Item
          name="name"
          label={<span className="text-white text-[15px] font-medium">Ad</span>}
          rules={nameRules}
        >
          <Input
            maxLength={30}
            placeholder="Adınızı daxil edin"
            prefix={<img src={person} alt="person" className="w-5 h-5 mr-2" />}
            onChange={(e) => handleChange(e, "name")}
          />
        </Form.Item>

        <Form.Item
          name="surname"
          label={<span className="text-white text-[15px] font-medium">Soyad</span>}
          rules={surnameRules}
        >
          <Input
            maxLength={30}
            placeholder="Soyadınızı daxil edin"
            prefix={<img src={person} alt="person" className="w-5 h-5 mr-2" />}
            onChange={(e) => handleChange(e, "surname")}
          />
        </Form.Item>

        <Form.Item
          name="date"
          label={<span className="text-white text-[15px] font-medium">Doğum tarixi</span>}
          validateTrigger="onChange"
          rules={[
            { required: true, message: "Zəhmət olmasa tarixi seçin" }
          ]}
        >
          <DatePicker
            className="w-full datepicker-clean custom-datepicker"
            format="DD.MM.YYYY"
            placeholder="gg.aa.iiii"
            allowClear={false}
            onChange={handleDateChange}
            prefix={<img src={calendar} alt="calendar" className="w-5 h-5" />}
            suffixIcon={null}
            disabledDate={(current) => current && current > dayjs().endOf("day")}
            classNames={{
              popup: { root: "custom-calendar-popup" },
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
