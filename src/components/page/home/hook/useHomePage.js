import { useEffect, useState } from "react";
import { getCourses } from "@/services/api";

const useHomePage = () => {
  const [advancedCourses, setAdvancedCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [discountCourses, setDiscountCourses] = useState([]);

  const fetchCourses = async (params, setter) => {
    try {
      const res = await getCourses(params);
      if (res.data?.code === 1) {
        setter(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses({ isAdvanced: true }, setAdvancedCourses);
    fetchCourses({ popular: true }, setPopularCourses);
    fetchCourses({ discountOnly: true }, setDiscountCourses);
  }, []);

  return {
    advancedCourses,
    popularCourses,
    discountCourses,
  };
};

export default useHomePage;
