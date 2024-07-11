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
      <RecipeCard firstName="Peter" lastName="Petrov" recipeName="Pry6ki" userImg="/static/images/avatar/1.jpg" rating={4} userName={"Patraz"}/>
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
            categoryName="APPETIZER"
          />
          <CategoryCard imageSource="images/salad.jpg" categoryName="SALADS" />
          <CategoryCard
            imageSource="images/main.jpg"
            categoryName="MAIN MEAL"
          />
          <CategoryCard imageSource="images/cake.jpg" categoryName="DESERTS" />
          <CategoryCard
            imageSource="images/beverage.jpg"
            categoryName="BEVERAGES"
          />
          <CategoryCard imageSource="images/snack.jpg" categoryName="SNACKS" />
        </Carousel>
      </div>
      <Breaker />
      <div className="flex gap-10 justify-center items-center">
        <CategoryCard
          imageSource="images/vegetables.jpg"
          categoryName="VEGETABLES"
          circle={true}
        />
        <CategoryCard
          imageSource="images/fruits.jpg"
          categoryName="FRUITS"
          circle={true}
        />

        <CategoryCard
          imageSource="images/meat.jpg"
          categoryName="MEAT"
          circle={true}
        />
        <CategoryCard
          imageSource="images/dairy.jpg"
          categoryName="DAIRY"
          circle={true}
        />
        <CategoryCard
          imageSource="images/grains.jpg"
          categoryName="SEAFOOD"
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
