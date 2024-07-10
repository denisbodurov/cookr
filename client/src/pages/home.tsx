import CategoryCard from "../components/categoryCard.tsx";
import Breaker from "../components/breaker.tsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useAuth } from "../provider/AuthProvider.tsx";

const Home: React.FC = () => {
  const {user, accessToken} = useAuth();
  console.log("USER: " + user, "TOKEN: " + accessToken);


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
            imageSource="../public/appetizer.jpg"
            categoryName="APPETIZER"
          />
          <CategoryCard
            imageSource="../public/salad.jpg"
            categoryName="SALADS"
          />
          <CategoryCard
            imageSource="../public/main.jpg"
            categoryName="MAIN MEAL"
          />
          <CategoryCard
            imageSource="../public/cake.jpg"
            categoryName="DESERTS"
          />
          <CategoryCard
            imageSource="../public/beverage.jpg"
            categoryName="BEVERAGES"
          />
          <CategoryCard
            imageSource="../public/snack.jpg"
            categoryName="SNACKS"
          />
        </Carousel>
      </div>
      <Breaker />
      <div className="flex gap-10 justify-center items-center">
        <CategoryCard
          imageSource="../public/snack.jpg"
          categoryName="SNACKS"
          circle={true}
        />
        <CategoryCard
          imageSource="../public/snack.jpg"
          categoryName="SNACKS"
          circle={true}
        />

        <CategoryCard
          imageSource="../public/snack.jpg"
          categoryName="SNACKS"
          circle={true}
        />
        <CategoryCard
          imageSource="../public/snack.jpg"
          categoryName="SNACKS"
          circle={true}
        />
        <CategoryCard
          imageSource="../public/snack.jpg"
          categoryName="SNACKS"
          circle={true}
        />
        <CategoryCard
          imageSource="../public/snack.jpg"
          categoryName="SNACKS"
          circle={true}
        />
      </div>
    </div>
  );
};

export default Home;
