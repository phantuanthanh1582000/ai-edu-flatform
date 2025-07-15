import React from "react";
import { Row, Col, Spin, Empty, Card, Pagination, Modal, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import CourseCard from "@/components/share/CourseCard";
import CourseFilter from "@/components/page/find/modal/CourseFilter";
import useFindPage from "../hook/useFindPage";
import "@/styles/find.style.scss";

const FindPage = () => {
  const {
    courses,
    loading,
    pagination,
    filterOpen,
    setFilterOpen,
    filters,
    setFilters,
    handlePageChange,
  } = useFindPage();

  return (
    <div className="section-wrapper">
      <div className="section-content">
        <Card
          className="find-page-wrapper"
          title="Danh sách khóa học"
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
                  <Col xs={12} sm={12} md={8} lg={6} key={course.id}>
                    <CourseCard {...course} />
                  </Col>
                ))}
              </Row>

              {pagination && (
                <div className="pagination-container">
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
