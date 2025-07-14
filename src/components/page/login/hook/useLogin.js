import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/api";
import { useAuth } from "@/global/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { onLogin } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);

    login(values)
      .then((res) => {
        if (res.data?.code === 1) {
          const { user, token } = res.data.data;
          onLogin(user, token);
          window.messageApi?.success("Đăng nhập thành công!");
          navigate("/");
        } else {
          window.messageApi?.error(res.data?.message || "Đăng nhập thất bại!");
        }
      })
      .catch(() => {
        window.messageApi?.error("Đăng nhập thất bại!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, onFinish };
};

export default useLogin;
