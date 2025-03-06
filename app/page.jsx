"use client";
import Aurora from "@/components/react-bits-ui/Aurora";
import HeroSection from "@/components/hero-section";
import { features } from "@/data/features";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";
import SpotlightCard from "@/components/react-bits-ui/SpotLightCard"
import GradientText from "@/components/react-bits-ui/GradientText";

export default function Home() {
  const { theme } = useTheme();
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

      <section className="w-full pb-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold tracking-tighter text-center mb-12 gradient-title">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={true}
              className="custom-class p-3"
            >Powerful Features for Your Career Growth</GradientText>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              return (
                <SpotlightCard key={index}  className="border-2 hover:border-[#00D8FF] transition-colors duration-300 flex items-center" spotlightColor="rgba(0, 229, 255, 0.2)">
                    <CardContent className="p-6 text-center flex flex-col items-center">
                      <div className="flex flex-col items-center justify-center">
                        {feature.icon}
                        <h3 className="text-xl font-semibold mb-2"> {feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </CardContent>
                    {/* <BorderBeam
                    duration={6}
                    delay={3}
                    size={400}
                    className="from-transparent via-blue-500 to-transparent"  /> */}
                </SpotlightCard>
              )
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
