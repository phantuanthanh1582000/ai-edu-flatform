import React from 'react';
import { Card } from 'antd';
// import '@/styles/course.style.scss'; 

const CourseCard = ({ name, price, image, shortDesc }) => {
  return (
    <Card
      hoverable
      className="course-card"
      cover={
        <img
          alt={name}
          src={image}
          className="course-image"
        />
      }
    >
      <Card.Meta
        title={name}
        description={
          <>
            <p className="course-desc">{shortDesc}</p>
            <strong>{price.toLocaleString()}đ</strong>
          </>
        }
      />
    </Card>
  );
};

export default CourseCard;
