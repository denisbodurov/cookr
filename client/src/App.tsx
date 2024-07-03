import "./App.css";
import Header from "./components/header.tsx";
import CategoryCard from "./components/categoryCard.tsx";
import Breaker from "./components/breaker.tsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


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

function App() {
  const appScreen = {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#F9F7F3",
    width: "100%",
    flexDirection: "column",
  };

  

  return (
    <div style={appScreen}>
      <Header />
      
      <div style={{ margin: "20px 0" }}>
        {/* Carousel for CategoryCard */}
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
      <div style={{ margin: "10px 0" }}>
        <Carousel
          additionalTransfrom={1}
          arrows
          centerMode={true}
          infinite
          responsive={responsive}
          itemClass="carousel-item-padding"
        >
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
        </Carousel>
      </div>
    </div>
  );
}

export default App;
