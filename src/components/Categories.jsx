import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Men",
    image: "https://i.pinimg.com/736x/0d/3f/57/0d3f577553f34d9ed7e83079fdd1228d.jpg",
    link: "/products?category=men",
  },
  {
    name: "Women",
    image: "https://www.stylevore.com/wp-content/uploads/2020/01/06180afb6e994386f14580ed78b777cf.jpg",
    link: "/products?category=women",
  },
  {
    name: "Kids",
    image: "https://th.bing.com/th/id/OIP.H77ANfXDgJfr8DN-CSWUPwHaHa?rs=1&pid=ImgDetMain",
    link: "/products?category=kids",
  },
  {
    name: "Footwear",
    image: "https://i.pinimg.com/736x/e3/ea/0e/e3ea0eeff0d44b0f1a503933cb41112e.jpg",
    link: "/products?category=footwear",
  },
  {
    name: "Accessories",
    image: "https://img.freepik.com/premium-photo/photographs-fashion-accessories_883586-41790.jpg",
    link: "/products?category=accessories",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-10 px-4 md:px-10 bg-amber-50 text-gray-900">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <Link
            to={cat.link}
            key={cat.name}
            className="bg-white rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow hover:shadow-xl"
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <div className="p-3 text-center font-medium text-lg">{cat.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
