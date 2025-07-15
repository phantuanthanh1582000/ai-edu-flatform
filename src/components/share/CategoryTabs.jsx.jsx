import React, { useEffect, useState } from "react";
import { Tabs, Spin, Typography, message, Button } from "antd";
import { getCourses } from "@/services/api";
import { Categories } from "@/data/mockData";
import CourseCard from "./CourseCard";
import { useNavigate } from "react-router-dom";

const CategoryTabs = () => {
  const [activeKey, setActiveKey] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCourses = async (category) => {
    setLoading(true);
    try {
      const res = await getCourses({ category });
      if (res.data.code === 1) {
        setCourses(res.data.data);
      } else {
        message.error(res.data.message || "Không lấy được khoá học");
      }
    } catch (err) {
      message.error("Lỗi kết nối đến máy chủ!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(activeKey);
  }, [activeKey]);

  const handleViewMore = () => {
    if (activeKey) {
      navigate(`/find?category=${activeKey}`);
    } else {
      navigate("/find");
    }
  };

  return (
    <div className="category-tabs-wrapper">
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        size="large"
        tabBarGutter={32}
        className="category-tabs"
        items={Categories.map((cate) => ({
          key: cate.value,
          label: cate.name,
          children: (
            <Spin spinning={loading}>
              <div className="course-scroll-wrapper">
                {courses.slice(0, 12).map((course) => (
                  <div className="course-scroll-item" key={course.id}>
                    <CourseCard {...course} />
                  </div>
                ))}
              </div>

              <div className="view-more-button">
                <Button type="primary" onClick={handleViewMore}>
                  Xem thêm
                </Button>
              </div>
            </Spin>
          ),
        }))}
      />
    </div>
  );
};

export default CategoryTabs;
