import { useEffect, useState } from "react";
import { getCourses } from "@/services/api";
import { useLocation } from "react-router-dom";

const parseBool = (value) => {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
};

const extractFiltersFromQuery = (search) => {
  const query = new URLSearchParams(search);
  return {
    page: parseInt(query.get("page")) || 1,
    limit: parseInt(query.get("limit")) || 12,
    category: query.get("category") || undefined,
    subcategory: query.get("subcategory") || undefined,
    isAdvanced: parseBool(query.get("isAdvanced")),
    popular: parseBool(query.get("popular")),
    discountOnly: parseBool(query.get("discountOnly")),
    minPrice: query.get("minPrice")
      ? parseInt(query.get("minPrice"))
      : undefined,
    maxPrice: query.get("maxPrice")
      ? parseInt(query.get("maxPrice"))
      : undefined,
    suggested: parseBool(query.get("suggested")),
  };
};

const fetchCourseData = async (
  filters,
  setCourses,
  setPagination,
  setLoading
) => {
  setLoading(true);
  try {
    const res = await getCourses(filters);
    if (res.data?.code === 1) {
      setCourses(res.data.data || []);
      const { page, limit, total } = res.data.pagination || {};
      if (page && limit && total) {
        setPagination({ current: page, pageSize: limit, total });
      }
    }
  } catch (error) {
    console.error("Lỗi khi fetch khóa học:", error);
  } finally {
    setLoading(false);
  }
};

const useFindPage = () => {
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
  });

  useEffect(() => {
    const initialFilters = extractFiltersFromQuery(location.search);
    setFilters(initialFilters);
  }, [location.search]);

  useEffect(() => {
    fetchCourseData(filters, setCourses, setPagination, setLoading);
  }, [filters]);

  const handlePageChange = (page, pageSize) => {
    setFilters((prev) => ({
      ...prev,
      page,
      limit: pageSize,
    }));
  };

  return {
    courses,
    loading,
    pagination,
    filterOpen,
    setFilterOpen,
    filters,
    setFilters,
    handlePageChange,
  };
};

export default useFindPage;
