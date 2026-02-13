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

  const surnameRules = [...nameRules];

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
    localStorage.setItem("loginData", JSON.stringify({ ...currentData, [field]: formatted }));
  };

  const handleDateChange = (date, dateString) => {
    const currentData = JSON.parse(localStorage.getItem("loginData") || "{}");
    localStorage.setItem("loginData", JSON.stringify({ ...currentData, date: dateString }));
  };

  const savedData = JSON.parse(localStorage.getItem("loginData") || "{}");

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
          date: savedData.date ? dayjs(savedData.date, "DD.MM.YYYY") : null,
        }}
      >
        <Form.Item name="name" label={<span className="text-white text-[15px] font-medium">Ad</span>} rules={nameRules}>
          <Input
            maxLength={30}
            placeholder="Adınızı daxil edin"
            prefix={<img src={person} alt="person" className="w-5 h-5 mr-2" />}
            onChange={(e) => handleChange(e, "name")}
          />
        </Form.Item>

        <Form.Item name="surname" label={<span className="text-white text-[15px] font-medium">Soyad</span>} rules={surnameRules}>
          <Input
            maxLength={30}
            placeholder="Soyadınızı daxil edin"
            prefix={<img src={person} alt="person" className="w-5 h-5 mr-2" />}
            onChange={(e) => handleChange(e, "surname")}
          />
        </Form.Item>

        <Form.Item name="date" label={<span className="text-white text-[15px] font-medium">Doğum tarixi</span>} rules={[{ required: true, message: "Zəhmət olmasa tarixi seçin" }]}>
          <DatePicker
            className="w-full custom-datepicker"
            format="DD.MM.YYYY"
            placeholder="gün.ay.il"
            allowClear={false}
            defaultValue={savedData.date ? dayjs(savedData.date, "DD.MM.YYYY") : dayjs()}
            onChange={handleDateChange}
            suffixIcon={null}
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
