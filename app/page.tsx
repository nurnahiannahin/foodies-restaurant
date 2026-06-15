import HeroMenu from "@/components/hero-menu";
import HeroSection from "@/components/hero-section";
import Menus from "@/components/menu";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <HeroMenu />
    </div>
  );
}
