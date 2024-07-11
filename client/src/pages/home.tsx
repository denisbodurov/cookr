import CategoryCard from "../components/categoryCard.tsx";
import Breaker from "../components/breaker.tsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RecipeCard from "../components/recipeCard.tsx";

const Home: React.FC = () => {
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
          <CategoryCard
            imageSource="images/appetizer.jpg"
            categoryName="appetizer"
          />
          <CategoryCard imageSource="images/salad.jpg" categoryName="salads" />
          <CategoryCard
            imageSource="images/main.jpg"
            categoryName="main meal"
          />
          <CategoryCard imageSource="images/cake.jpg" categoryName="desert" />
          <CategoryCard
            imageSource="images/beverage.jpg"
            categoryName="beverages"
          />
          <CategoryCard imageSource="images/snack.jpg" categoryName="snacks" />
        </Carousel>
      </div>
      <Breaker />
      <div className="flex gap-10 justify-center items-center">
        <CategoryCard
          imageSource="images/vegetables.jpg"
          categoryName="vegetables"
          circle={true}
        />
        <CategoryCard
          imageSource="images/fruits.jpg"
          categoryName="fruits"
          circle={true}
        />

        <CategoryCard
          imageSource="images/meat.jpg"
          categoryName="meat"
          circle={true}
        />
        <CategoryCard
          imageSource="images/dairy.jpg"
          categoryName="dairy"
          circle={true}
        />
        <CategoryCard
          imageSource="images/grains.jpg"
          categoryName="grains"
          circle={true}
        />
        <CategoryCard
          imageSource="images/seafood.jpg"
          categoryName="SNACKS"
          circle={true}
        />
      </div>
    </div>
  );
};

export default Home;
