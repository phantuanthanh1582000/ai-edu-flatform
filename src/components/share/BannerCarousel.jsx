import React from "react";
import { Carousel, Image } from "antd";

const banners = [
  {
    src:
      "https://file.unica.vn/storage/db240c65c57e0a4f35edba3312c62511cbac63cc/1440x565-1.png",
    alt: "Banner 1",
  },
  {
    src: "https://i.imgur.com/NuvfKwh.jpeg",
    alt: "Banner 2",
  },
  {
    src:
      "https://file.unica.vn/storage/db240c65c57e0a4f35edba3312c62511cbac63cc/ai-inhouse-slide-trang-chu-unica.png",
    alt: "Banner 3",
  },
  {
    src: "https://i.imgur.com/urj5lD9.png",
    alt: "Banner 4",
  },
  {
    src:
      "https://file.unica.vn/storage/db240c65c57e0a4f35edba3312c62511cbac63cc/banner-web-tkt-1516-4-1.png",
    alt: "Banner 5",
  },
];

const BannerCarousel = () => {
  return (
    <Carousel autoplay autoplaySpeed={3000} className="banner-carousel">
      {banners.map((banner, index) => (
        <div key={index} className="banner-slide">
          <Image
            src={banner.src}
            alt={banner.alt}
            preview={false}
            className="banner-image"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default BannerCarousel;
