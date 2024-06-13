import "./header.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Header = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    cssEase: "linear",
  };
  return (
    <>
      <br />
      <Slider {...settings}>
        <div>
          <div className="header first_slider">
            <div className="header_contents">
              <h2>Order your favourite food here</h2>
              <p>
                Experience the best cuisine from the comfort of your home.
                Choose from a wide variety of dishes and enjoy fast, reliable
                delivery service. Whether you&apos;re craving pizza.
              </p>
              <button>View Menu</button>
            </div>
          </div>
        </div>
        <div>
          <div className="header fourth_slider">
            <div className="header_contents">
              <h2>Order your favourite food here</h2>
              <p>
                Experience the best cuisine from the comfort of your home.
                Choose from a wide variety of dishes and enjoy fast, reliable
                delivery service. Whether you&apos;re craving pizza.
              </p>
              <button>View Menu</button>
            </div>
          </div>
        </div>
        <div>
          <div className="header second_slider">
            <div className="header_contents">
              <h2>Order your favourite food here</h2>
              <p>
                Experience the best cuisine from the comfort of your home.
                Choose from a wide variety of dishes and enjoy fast, reliable
                delivery service. Whether you&apos;re craving pizza.
              </p>
              <button>View Menu</button>
            </div>
          </div>
        </div>
        <div>
          <div className="header third_slider">
            <div className="header_contents">
              <h2>Order your favourite food here</h2>
              <p>
                Experience the best cuisine from the comfort of your home.
                Choose from a wide variety of dishes and enjoy fast, reliable
                delivery service. Whether you&apos;re craving pizza.
              </p>
              <button>View Menu</button>
            </div>
          </div>
        </div>
      </Slider>
    </>
  );
};

export default Header;
