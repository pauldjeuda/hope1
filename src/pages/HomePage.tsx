import HeroCharity from "../components/home/HeroCharity";
import Different from "../components/home/Different";
import AboutBlock from "../components/home/AboutBlock";
import Causes from "../components/home/Causes";
import FoodBanner from "../components/home/FoodBanner";
import Team from "../components/home/Team";
import News from "../components/home/News";
import Testimonials from "../components/home/Testimonials";

export default function HomePage() {
  return (
    <main id="main">
      <HeroCharity />
      <Different />
      <AboutBlock />
      <Causes />
      <FoodBanner />
      <Team />
      <News />
      <Testimonials />
    </main>
  );
}
