import HeroSlider from "@/Components/Home/HeroSlider";
import FeaturedLessons from "@/Components/Home/LessonsFetured";
import TopContributor from "@/Components/Home/TopContributor";
import WhyItMatters from "@/Components/Home/WhyItMetters";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <FeaturedLessons />
      <TopContributor />
      <WhyItMatters />
    </div>
  );
}
