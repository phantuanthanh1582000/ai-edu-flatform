import React, { useState } from "react";
import { Card, Image, Badge, Divider, Rate } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FormatUtils from "@/ulti/Format";
import { useAuth } from "@/global/AuthContext";

const CourseCard = ({
  id,
  name,
  price,
  image,
  shortDesc,
  discountPrice,
  teacher,
  videoCount,
  isAdvanced,
  isFavorite = false,
  onUnfavorite = null,
  rating = 0,
}) => {
  const [liked, setLiked] = useState(isFavorite);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCardClick = () => {
    let viewedIds = JSON.parse(localStorage.getItem("viewedCourses") || "[]");
    viewedIds = viewedIds.filter((itemId) => itemId !== id);
    viewedIds.unshift(id);
    if (viewedIds.length > 10) viewedIds = viewedIds.slice(0, 10);
    localStorage.setItem("viewedCourses", JSON.stringify(viewedIds));
    navigate("/coursedetail", { state: { courseId: id } });
  };

  const handleLikeToggle = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      window.messageApi?.warning("Vui lòng đăng nhập để thêm vào yêu thích");
      navigate("/login");
      return;
    }

    const nextLiked = !liked;
    setLiked(nextLiked);
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    let updatedFavorites = [...storedFavorites];

    if (nextLiked) {
      if (!storedFavorites.includes(id)) {
        updatedFavorites.push(id);
      }
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      window.messageApi?.success(`Đã thêm vào yêu thích sản phẩm có ID: ${id}`);
    } else {
      updatedFavorites = storedFavorites.filter((favId) => favId !== id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      window.messageApi?.success(`Đã bỏ khỏi yêu thích sản phẩm có ID: ${id}`);
      if (onUnfavorite) onUnfavorite();
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      window.messageApi?.warning("Vui lòng đăng nhập để thêm vào giỏ hàng");
      navigate("/login");
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = storedCart.findIndex((item) => item.id === id);

    if (existingIndex >= 0) {
      storedCart[existingIndex].quantity += 1;
    } else {
      storedCart.push({
        id,
        name,
        image,
        price: discountPrice || price,
        quantity: 1,
        shortDesc,
      });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    window.messageApi?.success("Đã thêm vào giỏ hàng");
  };

  const cardContent = (
    <Card
      hoverable
      className="course-card"
      onClick={handleCardClick}
      cover={
        <Image
          alt={name}
          src={image}
          preview={false}
          className="course-image"
        />
      }
    >
      <Card.Meta
        title={<strong>{name}</strong>}
        description={
          <>
            <p className="course-desc">{shortDesc}</p>
            <Divider style={{ margin: "8px 0" }} />
            <p className="meta-info">
              <UserOutlined /> <strong>{teacher}</strong> &nbsp;&nbsp;
              <VideoCameraOutlined /> <strong>{videoCount} video</strong>
            </p>
            <Rate disabled allowHalf defaultValue={rating} />
            <div className="price-action">
              <div className="price">
                {discountPrice ? (
                  <>
                    <strong className="discount-price">
                      {FormatUtils.vndPrice(discountPrice)}
                    </strong>
                    <span className="original-price">
                      {FormatUtils.vndPrice(price)}
                    </span>
                  </>
                ) : (
                  <strong className="full-price">
                    {FormatUtils.vndPrice(price)}
                  </strong>
                )}
              </div>
              <div className="actions">
                <div
                  className={`icon-like ${liked ? "liked" : "unliked"}`}
                  onClick={handleLikeToggle}
                >
                  {liked ? <HeartFilled /> : <HeartOutlined />}
                </div>
                <div className="icon-cart" onClick={handleAddToCart}>
                  <ShoppingCartOutlined />
                </div>
              </div>
            </div>
          </>
        }
      />
    </Card>
  );

  return (
    <div className="course-wrapper">
      {isAdvanced && <div className="advanced-label">Nâng cao</div>}
      {discountPrice ? (
        <Badge.Ribbon text="Ưu đãi" color="red">
          {cardContent}
        </Badge.Ribbon>
      ) : (
        cardContent
      )}
    </div>
  );
};

export default CourseCard;
