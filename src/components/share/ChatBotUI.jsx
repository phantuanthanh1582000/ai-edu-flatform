import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import CustomCourseList from "./CustomCourseList";

const theme = {
  background: "#f5f8fb",
  headerBgColor: "#1890ff",
  headerFontColor: "#fff",
  headerFontSize: "16px",
  botBubbleColor: "#1890ff",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const steps = [
  {
    id: "start",
    message: "Bạn muốn xem khóa học theo lĩnh vực nào?",
    trigger: "choose-category",
  },
  {
    id: "choose-category",
    options: [
      { value: "frontend", label: "Frontend", trigger: "show-frontend" },
      { value: "backend", label: "Backend", trigger: "show-backend" },
      { value: "ai", label: "AI", trigger: "show-ai" },
      { value: "data-science", label: "Data Science", trigger: "show-ds" },
      { value: "devops", label: "DevOps", trigger: "show-devops" },
      { value: "uiux", label: "UI/UX", trigger: "show-uiux" },
      { value: "mobile", label: "Mobile", trigger: "show-mobile" },
    ],
  },

  {
    id: "show-frontend",
    component: <CustomCourseList category="frontend" />,
    trigger: "again",
  },
  {
    id: "show-backend",
    component: <CustomCourseList category="backend" />,
    trigger: "again",
  },
  {
    id: "show-ai",
    component: <CustomCourseList category="ai" />,
    trigger: "again",
  },
  {
    id: "show-ds",
    component: <CustomCourseList category="data-science" />,
    trigger: "again",
  },
  {
    id: "show-devops",
    component: <CustomCourseList category="devops" />,
    trigger: "again",
  },
  {
    id: "show-uiux",
    component: <CustomCourseList category="uiux" />,
    trigger: "again",
  },
  {
    id: "show-mobile",
    component: <CustomCourseList category="mobile" />,
    trigger: "again",
  },

  {
    id: "again",
    message: "Bạn muốn xem lĩnh vực khác không?",
    trigger: "again-options",
  },
  {
    id: "again-options",
    options: [
      { value: "yes", label: "Có", trigger: "choose-category" },
      { value: "no", label: "Không", trigger: "end" },
    ],
  },
  {
    id: "end",
    message: "Cảm ơn bạn đã sử dụng chatbot!",
    end: true,
  },
];

const Chatbot = () => (
  <ThemeProvider theme={theme}>
    <ChatBot steps={steps} floating={true} headerTitle="Tư vấn khóa học" />
  </ThemeProvider>
);

export default Chatbot;
