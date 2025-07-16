import React, { useState, useEffect } from "react";
import { Rate, Typography, message, Avatar } from "antd";
import CustomForm from "@/components/share/CustomForm";
import FormatUtils from "@/ulti/Format";
import { useAuth } from "@/global/AuthContext";
import { useNavigate } from "react-router-dom";
import { getReviewsByCourseId, saveReview } from "@/services/api";

const { Title, Text } = Typography;

const CourseReviewForm = ({ courseId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async (courseId) => {
    try {
      const res = await getReviewsByCourseId(courseId);
      if (res.data.code === 1) {
        setReviews(res.data.data);
      }
    } catch (err) {
      console.error("Lỗi khi lấy đánh giá:", err);
    }
  };

  const handleSubmit = async (values) => {
    if (!user) {
      window.messageApi?.warning("Vui lòng đăng nhập!");
      navigate("/login");
      return;
    }

    if (!rating) {
      return window.messageApi?.warning("Vui lòng chọn số sao.");
    }

    const review = {
      courseId,
      rating,
      comment: values.comment,
      createdAt: new Date().toISOString(),
      userId: user.id,
      userName: user.name,
      avatar: user.avatar,
    };

    try {
      const res = await saveReview(review);
      if (res.data.code === 1) {
        message.success("Đã gửi đánh giá!");
        setSubmitted(true);
        fetchReviews(courseId);
      }
    } catch (err) {
      message.error("Lỗi khi gửi đánh giá!");
    }
  };

  useEffect(() => {
    if (courseId) fetchReviews(courseId);
  }, [courseId]);

  const fields = [
    {
      name: "comment",
      label: "Bình luận",
      type: "textarea",
      rules: [{ required: true, message: "Vui lòng nhập bình luận" }],
      placeholder: "Hãy chia sẻ cảm nhận của bạn...",
    },
  ];

  return (
    <div className="section-content">
      <div
        className="course-review"
        style={{
          background: "transparent",
          border: "1px solid black",
          padding: 32,
        }}
      >
        <Title className="title-review" level={2} style={{ marginTop: 0 }}>
          Đánh giá khóa học
        </Title>

        {submitted ? (
          <Text
            className="content-review"
            style={{ fontSize: 18 }}
            type="success"
          >
            ✅ Bạn đã gửi đánh giá!
          </Text>
        ) : (
          <>
            <Text className="content-review" style={{ fontSize: 18 }}>
              Chọn số sao:
            </Text>
            <br />
            <Rate
              value={rating}
              onChange={setRating}
              style={{ marginBottom: 16 }}
            />
            <CustomForm
              fields={fields}
              onFinish={handleSubmit}
              submitText="Gửi đánh giá"
            />
          </>
        )}

        {reviews.map((review, idx) => (
          <div
            key={idx}
            style={{ marginTop: 16, borderBottom: "1px solid #eee" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Avatar
                size={40}
                src={review.avatar}
                style={{ marginRight: 12 }}
              />
              <Text strong>{review.userName || "Ẩn danh"}</Text>
            </div>
            <Rate disabled defaultValue={review.rating} />
            <Text style={{ display: "block", marginTop: 8 }}>
              {review.comment}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {FormatUtils.formatFullDateTime(review.createdAt)}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseReviewForm;
