import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Col, Spin, Empty, Card, Pagination, Modal, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { getCourses } from "@/services/api";
import CourseCard from "@/components/share/CourseCard";
import CourseFilter from "@/components/page/find/modal/CourseFilter";
import "@/styles/find.style.scss";

const parseBool = (value) => {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
};

const FindPage = () => {
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
    const query = new URLSearchParams(location.search);
    const initialFilters = {
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
    setFilters(initialFilters);
  }, [location.search]);

  useEffect(() => {
    console.log("[FILTER CHANGED]", filters);

    setLoading(true);
    getCourses(filters)
      .then((res) => {
        if (res.data?.code === 1) {
          setCourses(res.data.data || []);
          if (res.data.pagination) {
            const { page, limit, total } = res.data.pagination;
            setPagination({ current: page, pageSize: limit, total });
          }
        }
      })
      .finally(() => setLoading(false));
  }, [filters]);

  const handlePageChange = (page, pageSize) => {
    setFilters((prev) => ({
      ...prev,
      page,
      limit: pageSize,
    }));
  };

  return (
    <div className="section-wrapper">
      <div className="section-content">
        <Card
          className="find-page-wrapper"
          title={
            <span style={{ fontSize: 30, fontWeight: 600 }}>
              Danh sách khóa học
            </span>
          }
          styles={{ header: { padding: "16px 24px" } }}
          extra={
            <Button
              icon={<FilterOutlined />}
              onClick={() => setFilterOpen(true)}
            >
              Bộ lọc
            </Button>
          }
        >
          {loading ? (
            <div className="find-page-loading">
              <Spin size="large" />
            </div>
          ) : courses.length === 0 ? (
            <div className="find-page-empty">
              <Empty description="Không tìm thấy khóa học phù hợp" />
            </div>
          ) : (
            <>
              <Row gutter={[24, 24]}>
                {courses.map((course) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
                    <CourseCard {...course} />
                  </Col>
                ))}
              </Row>

              {pagination && (
                <div
                  style={{
                    marginTop: 32,
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Pagination
                    current={pagination.current}
                    pageSize={pagination.pageSize}
                    total={pagination.total}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                  />
                </div>
              )}
            </>
          )}
        </Card>
      </div>

      <Modal
        open={filterOpen}
        onCancel={() => setFilterOpen(false)}
        footer={null}
        title="Bộ lọc khóa học"
        width={600}
        centered
        destroyOnHidden
      >
        <CourseFilter
          filters={filters}
          setFilters={setFilters}
          onClose={() => setFilterOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default FindPage;
