"use client";
import Aurora from "@/components/react-bits-ui/Aurora";
import HeroSection from "@/components/hero-section";
import { features } from "@/data/features";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";
import SpotlightCard from "@/components/react-bits-ui/SpotLightCard"
import GradientText from "@/components/react-bits-ui/GradientText";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { howItWorks } from "@/data/howItWorks";

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

      <section className="w-full pb-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold tracking-tighter text-center mb-12 gradient-title">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class overflow-visible"
            >Powerful Features for Your Career Growth</GradientText>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              return (
                <SpotlightCard key={index} className="border-2 hover:border-[#00D8FF] transition-colors duration-300 flex items-center justify-center" spotlightColor="rgba(0, 229, 255, 0.2)">
                  <CardContent className="p-6 text-center">
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

      <section className="relative rounded-md antialiased w-full py-12 md:py-24  overflow-hidden" >
        <div className="absolute w-full inset-0 -z-10 ">
          <BackgroundBeams />
        </div>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-center">
          <div className="flex md:flex-row flex-col gap-6 justify-between items-center text-center w-[80%] mx-auto">
            <div className="felx flex-col items-center justify-center space-y-2">
              <h3 className="text-5xl font-bold gradient-title">50+</h3>
              <p className="text-muted-foreground text-xl">Industries Covered</p>
            </div>
            <div className="felx flex-col items-center justify-center space-y-2">
              <h3 className="text-5xl font-bold gradient-title">1000+</h3>
              <p className="text-muted-foreground text-xl">Interview Question</p>
            </div>
            <div className="felx flex-col items-center justify-center space-y-2">
              <h3 className="text-5xl font-bold gradient-title">95%</h3>
              <p className="text-muted-foreground text-xl">Success Rate</p>
            </div>
            <div className="felx flex-col items-center justify-center space-y-2">
              <h3 className="text-5xl font-bold gradient-title">24/7</h3>
              <p className="text-muted-foreground text-xl">AI Support</p>
            </div>
          </div>
        </div>

      </section>

      <section className="w-full py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6  flex flex-col items-center justify-between">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="custom-class overflow-visible"
              >How It Works</GradientText>
            </h2>
            <p className="text-muted-foreground text-xl">Four simple steps to accelerate your carrer growth</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  mx-auto">
            {howItWorks.map((item, index) => {
              return (
                <div key={index} className="flex flex-col items-center text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">{item.icon}</div>
                  <h3 className="font-semibold text-xl">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
