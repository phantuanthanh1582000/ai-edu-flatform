import { useEffect, useState } from "react";
import { getCourseDetail, getCoursesByIds } from "@/services/api";

const useCourseDetailPage = (courseId) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [historyCourses, setHistoryCourses] = useState([]);

  useEffect(() => {
    if (!courseId) return;

    setLoading(true);

    getCourseDetail(courseId)
      .then((res) => {
        if (res.data.code === 1) {
          setCourse(res.data.data);
        }
      })
      .finally(() => setLoading(false));

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

  return { course, loading, historyCourses };
};

export default useCourseDetailPage;
