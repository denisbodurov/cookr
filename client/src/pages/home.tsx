import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "../components/categoryCard";
import Breaker from "../components/breaker";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { convertKeysToCamelCase } from "../helpers/keysToCamelCase";

const Home: React.FC = () => {
  const [categories, setCategories] = useState([]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PUBLIC_HOST}/api/v1/recipes/recipe/types`
        );
        const data = convertKeysToCamelCase(response.data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex justify-center bg-backgroundLight w-full flex-col">
      <div className="py-5">
        <Carousel
          additionalTransfrom={1}
          arrows
          centerMode={true}
          infinite
          responsive={responsive}
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              imageSource={category.image}
              categoryName={category.name}
            />
          ))}
        </Carousel>
      </div>
      <Breaker />
      <div className="flex gap-10 justify-center items-center">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            imageSource={category.image}
            categoryName={category.name}
            circle={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
