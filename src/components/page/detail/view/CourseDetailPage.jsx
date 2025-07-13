import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCourseDetail, getCoursesByIds } from "@/services/api";
import { Typography, Spin } from "antd";
import SummaryCourseDetail from "@/components/page/detail/modal/SummaryCourseDetail";
import CourseFullDescription from "@/components/page/detail/modal/CourseFullDescription";
import CourseReviewForm from "../modal/CourseReviewForm";
import SectionCourse from "@/components/share/SectionCourse";
import "@/styles/detail.style.scss";

const { Text } = Typography;

const CourseDetailPage = () => {
  const location = useLocation();
  const courseId = location.state?.courseId;

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lịch sử xem
  const [historyCourses, setHistoryCourses] = useState([]);

  useEffect(() => {
    if (!courseId) return;

    setLoading(true);

    // 1. Lấy chi tiết khóa học
    getCourseDetail(courseId)
      .then((res) => {
        if (res.data.code === 1) {
          setCourse(res.data.data);
        }
      })
      .finally(() => setLoading(false));

    // 2. Lấy lịch sử xem từ localStorage (loại bỏ khóa học hiện tại)
    let viewedIds = JSON.parse(localStorage.getItem("viewedCourses") || "[]");
    viewedIds = viewedIds.filter((id) => id !== courseId);

    if (viewedIds.length > 0) {
      getCoursesByIds(viewedIds).then((res) => {
        if (res.data.code === 1) {
          setHistoryCourses(res.data.data);
        }
      });
    }
  }, [courseId]);

  if (!courseId) {
    return <Text type="danger">❌ Không tìm thấy ID khóa học.</Text>;
  }

  if (loading) return <Spin />;

  if (!course) {
    return <Text type="danger">❌ Không tìm thấy thông tin khóa học.</Text>;
  }

  return (
    <div className="course-detail-container">
      <SummaryCourseDetail course={course} />

      <div className="section-wrapper">
        <CourseFullDescription course={course} />
      </div>

      <div className="section-wrapper">
        <CourseReviewForm courseId={course.id} />
      </div>

      <div className="section-wrapper">
        <div
          className="section-content"
          style={{
            background: "transparent",
          }}
        >
          {historyCourses.length > 0 && (
            <SectionCourse
              title="Khóa học bạn đã xem gần đây"
              courses={historyCourses}
              showMax={4}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
