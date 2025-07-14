import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import TeacherCard from "./TeacherCard";
import { getTeachers } from "@/services/api";

const TeacherCarousel = () => {
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = async () => {
    try {
      const res = await getTeachers();
      if (res.data?.code === 1) {
        setTeachers(res.data.data);
      }
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách giảng viên:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    arrows: false,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {teachers.map((teacher) => (
          <div key={teacher.id}>
            <div>
              <TeacherCard {...teacher} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TeacherCarousel;
