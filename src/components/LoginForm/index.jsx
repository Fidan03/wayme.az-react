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
    localStorage.setItem(
      "loginData",
      JSON.stringify({ ...currentData, [field]: formatted })
    );
  };

  const handleDateInput = (e) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 8);
    if (val.length >= 3) val = val.slice(0, 2) + "." + val.slice(2);
    if (val.length >= 6) val = val.slice(0, 5) + "." + val.slice(5);
    form.setFieldsValue({ date: val });
    const currentData = JSON.parse(localStorage.getItem("loginData") || "{}");
    localStorage.setItem(
      "loginData",
      JSON.stringify({ ...currentData, date: val })
    );
  };

  const handleDateChange = (date, dateString) => {
    form.setFieldsValue({ date: dateString });
    const currentData = JSON.parse(localStorage.getItem("loginData") || "{}");
    localStorage.setItem(
      "loginData",
      JSON.stringify({ ...currentData, date: dateString })
    );
  };

  const savedData = JSON.parse(localStorage.getItem("loginData") || "{}");
  const hasError = (field) => form.getFieldError(field).length > 0;

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
          date: savedData.date || "",
        }}
      >
        <Form.Item
          name="name"
          label={<span className="text-white text-[15px] font-medium">Ad</span>}
          rules={nameRules}
        >
          <div className={`error-box ${hasError("name") ? "error-box-active" : ""}`}>
            <Input
              maxLength={30}
              placeholder="Adınızı daxil edin"
              prefix={<img src={person} alt="person" className="w-5 h-5 mr-2" />}
              onChange={(e) => handleChange(e, "name")}
            />
          </div>
        </Form.Item>

        <Form.Item
          name="surname"
          label={<span className="text-white text-[15px] font-medium">Soyad</span>}
          rules={surnameRules}
        >
          <div className={`error-box ${hasError("surname") ? "error-box-active" : ""}`}>
            <Input
              maxLength={30}
              placeholder="Soyadınızı daxil edin"
              prefix={<img src={person} alt="person" className="w-5 h-5 mr-2" />}
              onChange={(e) => handleChange(e, "surname")}
            />
          </div>
        </Form.Item>

        <Form.Item
          name="date"
          label={<span className="text-white text-[15px] font-medium">Doğum tarixi</span>}
          rules={[{ required: true, message: "Zəhmət olmasa tarixi seçin" }]}
        >
          <div className={`error-box ${hasError("date") ? "error-box-active" : ""}`}>
            <DatePicker
              className="w-full datepicker-clean"
              format="DD.MM.YYYY"
              placeholder="gg.aa.iiii"
              allowClear={false}
              onChange={handleDateChange}
              suffixIcon={null}
              inputRender={(props, ref) => (
                <div className="flex items-center w-full h-full px-3">
                  <img src={calendar} alt="calendar" className="w-5 h-5 mr-2" />
                  <input
                    ref={ref}
                    {...props}
                    className="datepicker-input"
                    value={form.getFieldValue("date")}
                    onChange={handleDateInput}
                  />
                </div>
              )}
            />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;