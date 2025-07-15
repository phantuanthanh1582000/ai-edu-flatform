import React, { useState, useEffect } from "react";
import { Rate, Typography, message, Avatar } from "antd";
import CustomForm from "@/components/share/CustomForm";
import { useAuth } from "@/global/AuthContext";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const CourseReviewForm = ({ courseId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (values) => {
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

    const stored = JSON.parse(localStorage.getItem("reviews") || "[]");
    stored.push(review);
    localStorage.setItem("reviews", JSON.stringify(stored));

    message.success("Đã gửi đánh giá!");
    setSubmitted(true);
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reviews") || "[]");
    const filtered = stored.filter((r) => r.courseId === courseId);
    setReviews(filtered);
  }, [courseId, submitted]);

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
        <Title
          className="title"
          level={2}
          style={{ marginTop: 0, fontSize: 32 }}
        >
          Đánh giá khóa học
        </Title>

        {submitted ? (
          <Text className="content" style={{ fontSize: 18 }} type="success">
            ✅ Bạn đã gửi đánh giá!
          </Text>
        ) : (
          <>
            <Text className="content" style={{ fontSize: 18 }}>
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
            style={{
              marginTop: 16,
              borderBottom: "1px solid #eee",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
            >
              <Avatar
                size={40}
                style={{ marginRight: 12 }}
                src={review.avatar}
              />
              <Text className="content" strong>
                {review.userName || "Ẩn danh"}
              </Text>
            </div>

            <Rate disabled defaultValue={review.rating} />
            <Text
              className="content"
              style={{ display: "block", marginTop: 8 }}
            >
              {review.comment}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {new Date(review.createdAt).toLocaleString()}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseReviewForm;
