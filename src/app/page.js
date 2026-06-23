import HeroSlider from "@/Components/Home/HeroSlider";
import TopContributors from "@/Components/Home/TopContributors";
import WhyItMatters from "@/Components/Home/WhyItMetters";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <WhyItMatters />
      <TopContributors />
    </div>
  );
}
