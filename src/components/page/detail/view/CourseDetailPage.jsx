import React from "react";
import { useLocation } from "react-router-dom";
import { Typography, Spin } from "antd";
import SummaryCourseDetail from "@/components/page/detail/modal/SummaryCourseDetail";
import CourseFullDescription from "@/components/page/detail/modal/CourseFullDescription";
import CourseReviewForm from "../modal/CourseReviewForm";
import SectionCourse from "@/components/share/SectionCourse";
import useCourseDetailPage from "../hook/useCourseDetailPage";
import "@/styles/detail.style.scss";

const { Text } = Typography;

const CourseDetailPage = () => {
  const location = useLocation();
  const courseId = location.state?.courseId;

  const { course, loading, historyCourses } = useCourseDetailPage(courseId);

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

      <div className="section-wrapper history-view">
        <div className="section-content">
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
