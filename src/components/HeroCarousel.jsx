import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
  const slideRefs = {
    slide1: useRef(null),
    slide2: useRef(null),
    slide3: useRef(null),
    slide4: useRef(null),
  };

  const scrollToSlide = (id) => {
    slideRefs[id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <div className="py-4 carousel w-full rounded-box overflow-hidden h-100">
      {/* Slide 1 */}
      <div ref={slideRefs.slide1} className="carousel-item relative w-full h-full">
        <img
          src="https://www.creativefabrica.com/wp-content/uploads/2021/04/26/Creative-Fashion-Sale-Banner-Graphics-11345601-1.jpg"
          className="w-full h-full object-cover rounded-xl"
          alt="Banner 1"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <button onClick={() => scrollToSlide("slide4")} className="btn btn-circle">❮</button>
          <button onClick={() => scrollToSlide("slide2")} className="btn btn-circle">❯</button>
        </div>
      </div>

      {/* Slide 2 (Linked to Sarees Subcategory) */}
      <div ref={slideRefs.slide2} className="carousel-item relative w-full h-full">
        <Link to="/products?subcategory=Sarees" className="block w-full h-full">
          <img
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/Fashion/WA19/SareeStore/top-banner.jpg"
            className="w-full h-full object-cover rounded-xl"
            alt="Sarees Banner"
          />
        </Link>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <button onClick={() => scrollToSlide("slide1")} className="btn btn-circle">❮</button>
          <button onClick={() => scrollToSlide("slide3")} className="btn btn-circle">❯</button>
        </div>
      </div>

      {/* Slide 3 (Linked to Sunglasses Subcategory) */}
      <div ref={slideRefs.slide3} className="carousel-item relative w-full h-full">
        <Link to="/products?subcategory=Sunglasses" className="block w-full h-full">
          <img
            src="https://cdn5.vectorstock.com/i/1000x1000/03/99/sunglasses-sale-banner-big-50-off-summer-vector-28070399.jpg"
            className="w-full h-full object-cover rounded-xl"
            alt="Sunglasses Banner"
          />
        </Link>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <button onClick={() => scrollToSlide("slide2")} className="btn btn-circle">❮</button>
          <button onClick={() => scrollToSlide("slide4")} className="btn btn-circle">❯</button>
        </div>
      </div>

      {/* Slide 4 (Linked to Jeans Subcategory) */}
      <div ref={slideRefs.slide4} className="carousel-item relative w-full h-full">
        <Link to="/products?subcategory=Jeans" className="block w-full h-full">
          <img
            src="https://i.pinimg.com/originals/57/83/d8/5783d8903aca5542408ad03d8c3a3c7b.png"
            className="w-full h-full object-cover rounded-xl"
            alt="Jeans Banner"
          />
        </Link>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <button onClick={() => scrollToSlide("slide3")} className="btn btn-circle">❮</button>
          <button onClick={() => scrollToSlide("slide1")} className="btn btn-circle">❯</button>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
