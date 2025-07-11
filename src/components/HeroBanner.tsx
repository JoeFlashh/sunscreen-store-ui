import HeroImage from "../assets/images/surfer.jpg";

function HeroBanner() {
  return (
    <div className="hero-banner-img-container">
      <img src={HeroImage} alt="" />
      <div className="hero-banner-img-container-text">
        <h1>
          Protect Your Skin. <br /> Surf All Day.
        </h1>
      </div>
    </div>
  );
}

export default HeroBanner;
