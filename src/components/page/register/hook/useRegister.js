import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("Register:", values);
    window.messageApi?.success("Đăng ký thành công!");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return { handleSubmit };
};

export default useRegister;
