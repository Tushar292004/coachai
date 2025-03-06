import Aurora from "@/components/react-bits-ui/Aurora";
import HeroSection from "@/components/hero-section";
export default function Home() {
  return (
    <div className="">
      <div className="absolute inset-0 -z-10">
        <Aurora
        colorStops={["#00D8FF", "#16567E", "#00D8FF"]}
        blend={1}
        amplitude={2}
        speed={0.5}
      />
      </div>
      <HeroSection />
    </div>
  );
}
