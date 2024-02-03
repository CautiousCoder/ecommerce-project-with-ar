import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const imageData = [
  { link: "https://picsum.photos/id/1/600/400", alt: "Image_01" },
  { link: "https://picsum.photos/id/4/600/400", alt: "Image_01" },
  { link: "https://picsum.photos/id/7/600/400", alt: "Image_01" },
];

const MainCarousel = ({
  data = imageData,
  type = null,
  duration = 5000,
  infinite = true,
}) => {
  const items = data.map((item) => (
    <img
      className="cursor-pointer w-fit"
      role="presentation"
      src={item.link}
      alt={item.alt}
    />
  ));
  return (
    <AliceCarousel
      items={items}
      animationType={type}
      disableButtonsControls
      disableDotsControls
      autoPlay
      autoPlayInterval={duration}
      infinite={infinite}
    />
  );
};
export default MainCarousel;
