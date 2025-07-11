import React, { useState } from 'react';
import { Card, Image, Badge, Divider } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import '@/styles/home.style.scss';

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
}) => {
  const [liked, setLiked] = useState(false);

  const handleLikeToggle = (e) => {
    e.stopPropagation();
    const nextLiked = !liked;
    setLiked(nextLiked);
    window.messageApi?.success(
      nextLiked
        ? `Đã thêm vào yêu thích sản phẩm có ID: ${id}`
        : `Đã bỏ khỏi yêu thích sản phẩm có ID: ${id}`
    );
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    window.messageApi?.success('Đã thêm vào giỏ hàng');
  };

  const content = (
    <Card
      hoverable
      className="course-card"
      styles={{ body: { padding: 16 } }}
      cover={
        <Image
          alt={name}
          src={image}
          preview={false}
          className="course-image"
          style={{
            height: 180,
            objectFit: 'cover',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
      }
    >
      <Card.Meta
        title={<strong>{name}</strong>}
        description={
          <>
            <p
              className="course-desc"
              style={{
                height: 48,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                marginBottom: 8,
              }}
            >
              {shortDesc}
            </p>

            <Divider style={{ margin: '8px 0' }} />

            <p style={{ marginBottom: 4, fontSize: 13, color: '#555' }}>
              <UserOutlined /> <strong>{teacher}</strong> &nbsp;&nbsp;
              <VideoCameraOutlined /> <strong>{videoCount} video</strong>
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 8,
              }}
            >
              <div>
                {discountPrice ? (
                  <>
                    <strong style={{ color: '#d4380d', marginRight: 8 }}>
                      đ{discountPrice.toLocaleString()}
                    </strong>
                    <span
                      style={{
                        textDecoration: 'line-through',
                        color: '#999',
                        fontSize: 13,
                      }}
                    >
                      {price.toLocaleString()}đ
                    </span>
                  </>
                ) : (
                  <strong style={{ color: 'green' }}>
                    {price.toLocaleString()}đ
                  </strong>
                )}
              </div>

              <div style={{ display: 'flex', gap: 12, fontSize: 20 }}>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={handleLikeToggle}
                  title={liked ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
                >
                  {liked ? (
                    <HeartFilled style={{ color: 'red' }} />
                  ) : (
                    <HeartOutlined style={{ color: '#888' }} />
                  )}
                </div>

                <div
                  style={{ cursor: 'pointer' }}
                  onClick={handleAddToCart}
                  title="Thêm vào giỏ hàng"
                >
                  <ShoppingCartOutlined style={{ color: '#1890ff' }} />
                </div>
              </div>
            </div>
          </>
        }
      />
    </Card>
  );

  const cardWithAdvancedLabel = (
    <div style={{ position: 'relative' }}>
      {isAdvanced && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: 8,
            background: '#722ed1',
            color: 'white',
            padding: '2px 8px',
            fontSize: 12,
            borderRadius: 4,
            zIndex: 2,
            fontWeight: 600,
          }}
        >
          Nâng cao
        </div>
      )}
      {content}
    </div>
  );

  return discountPrice ? (
    <Badge.Ribbon text="Ưu đãi" color="red">
      {cardWithAdvancedLabel}
    </Badge.Ribbon>
  ) : (
    cardWithAdvancedLabel
  );
};

export default CourseCard;
