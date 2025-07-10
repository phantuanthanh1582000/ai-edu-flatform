import React from 'react';
import { Card, Image, Badge, Divider } from 'antd';
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import '@/styles/home.style.scss';

const CourseCard = ({ name, price, image, shortDesc, discountPrice, teacher, videoCount, isAdvanced }) => {
  const finalPrice = discountPrice || price;

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

            {discountPrice ? (
              <p>
                <strong style={{ color: '#d4380d', marginRight: 8  }}>đ{discountPrice.toLocaleString()}</strong>
                <span style={{ textDecoration: 'line-through', color: '#999'}}>
                  {price.toLocaleString()}
                </span>
                
              </p>
            ) : (
              <strong style={{ color: 'green' }}>{price.toLocaleString()}đ</strong>
            )}
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
