import React from 'react';
import { Card, Image } from 'antd';
import '@/styles/home.style.scss'; // SCSS file chứa style hover

const CourseCard = ({ name, price, image, shortDesc }) => {
  return (
    <Card
      hoverable
      className="course-card"
      bodyStyle={{ padding: 16 }}
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
        title={name}
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
            <strong>{price.toLocaleString()}đ</strong>
          </>
        }
      />
    </Card>
  );
};

export default CourseCard;
