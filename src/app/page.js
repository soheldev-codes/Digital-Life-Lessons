import HeroSlider from "@/Components/Home/HeroSlider";
import TopContributors from "@/Components/Home/TopContributors";
import WhyItMatters from "@/Components/Home/WhyItMetters";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <WhyItMatters />
      <TopContributors />
    </div>
  );
}
