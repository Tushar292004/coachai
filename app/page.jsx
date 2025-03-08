"use client";
import Aurora from "@/components/react-bits-ui/Aurora";
import HeroSection from "@/components/hero-section";
import { features } from "@/data/features";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SpotlightCard from "@/components/react-bits-ui/SpotLightCard"
import GradientText from "@/components/react-bits-ui/GradientText";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { motion } from "framer-motion";
import ClickSpark from "@/components/react-bits-ui/ClickSpark"
import Iridescence from "@/components/react-bits-ui/RideScene"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { faqs } from "@/data/faqs";
import Link from "next/link";
import { RippleButton } from "@/components/magicui/ripple-button";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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

      <section className="w-full pb-12 bg-background ">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold tracking-tighter text-center mb-12 gradient-title">
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Start invisible, move up
              whileInView={{ opacity: 1, y: 0 }} // Fade in when in view
              viewport={{ once: false }} // Runs only once
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="custom-class overflow-visible"
              >Powerful Features for Your Career Growth</GradientText>
            </motion.div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              return (
                <div data-aos="fade-up" className="flex h-full">
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
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative rounded-md antialiased w-full py-12 md:py-24  overflow-hidden" >
        {/* <div className="absolute w-full inset-0 -z-10 ">
          <BackgroundBeams />
        </div> */}
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-center">
          <div className="flex md:flex-row flex-col gap-6 justify-between items-center text-center w-[80%] mx-auto">
            <div data-aos="fade-up" className="felx flex-col items-center justify-center space-y-2">
              <h3 className="text-5xl font-bold gradient-title">50+</h3>
              <p className="text-muted-foreground text-xl">Industries Covered</p>
            </div>

            <div data-aos="fade-up" className="felx flex-col items-center justify-center space-y-2">
              <h3 className="text-5xl font-bold gradient-title">1000+</h3>
              <p className="text-muted-foreground text-xl">Interview Question</p>
            </div>
            <div data-aos="fade-up" className="felx flex-col items-center justify-center space-y-2">
              <h3 className="text-5xl font-bold gradient-title">95%</h3>
              <p className="text-muted-foreground text-xl">Success Rate</p>
            </div>
            <div data-aos="fade-up" className="felx flex-col items-center justify-center space-y-2">
              <h3 className="text-5xl font-bold gradient-title">24/7</h3>
              <p className="text-muted-foreground text-xl">AI Support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full pt-12 bg-background">
        <div className="container mx-auto px-4 md:px-6  flex flex-col items-center justify-between">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Start invisible, move up
              whileInView={{ opacity: 1, y: 0 }} // Fade in when in view
              viewport={{ once: false }} // Runs only once
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold mb-4">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={3}
                  showBorder={false}
                  className="custom-class overflow-visible"
                >How It Works</GradientText>
              </h2>
              <p className="text-muted-foreground text-xl">Four simple steps to accelerate your carrer growth</p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  mx-auto">
            {howItWorks.map((item, index) => {
              return (
                <div data-aos="fade-up">
                  <NeonGradientCard key={index} className="flex max-w-sm items-center justify-center text-center flex-col space-y-2">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">{item.icon}</div>
                    <h3 className="font-semibold text-xl">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </NeonGradientCard>
                </div>
              );
            })}
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-14 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }} // Start invisible, move up
            whileInView={{ opacity: 1, y: 0 }} // Fade in when in view
            viewport={{ once: false }} // Runs only once
            transition={{ duration: 0.8 }}
            className="text-center"
          >

            <h2 className="text-4xl font-bold tracking-tighter text-center mb-12 gradient-title">
              <motion.div
                initial={{ opacity: 0, y: 50 }} // Start invisible, move up
                whileInView={{ opacity: 1, y: 0 }} // Fade in when in view
                viewport={{ once: false }} // Runs only once
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={3}
                  showBorder={false}
                  className="custom-class overflow-visible"
                >What Our Users Say</GradientText>
              </motion.div>
            </h2>
            <AnimatedTestimonials testimonials={testimonial} />
          </motion.div>
        </div>
      </section>

      <section className="w-full py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mx-auto mb-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Start invisible, move up
              whileInView={{ opacity: 1, y: 0 }} // Fade in when in view
              viewport={{ once: false }} // Runs only once
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold mb-4">

                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={3}
                  showBorder={false}
                  className="custom-class overflow-visible"
                >Frequently Asked Questions</GradientText>
              </h2>
              <p className="text-muted-foreground text-xl">Find answers to common questions about our platform</p>
            </motion.div>
          </div>
          <div className="mx-auto max-w-6xl">
            <ClickSpark
              sparkColor='#fff'
              sparkSize={10}
              sparkRadius={15}
              sparkCount={8}
              duration={400}
            >
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => {
                  return (
                    <div data-aos="fade-up">
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className={"text-xl font-thin text-slate-200"} >{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </div>
                  );
                })}
              </Accordion>
            </ClickSpark>
          </div>
        </div>
      </section>

      <section className="w-full pt-6 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Start invisible, move up
          whileInView={{ opacity: 1, y: 0 }} // Fade in when in view
          viewport={{ once: false }} // Runs only once
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mx-auto relative w-full h-[40vh]">
            <div className="absolute inset-0 z-0">
              <Iridescence
                color={[0, 0.7, 0.7]}
                mouseReact={false}
                amplitude={0.1}
                speed={1.0}
              />
            </div>

            <div className="p-4 absolute inset-0 flex flex-col items-center text-center justify-center z-10 ">
              <h1 className="text-white text-4xl font-bold">Ready to Accelerate Your Career ?</h1>
              <p className="mx-auto text-xl  text-primary">
                Join thousands of professionals who are advancing their careers
              </p>
              <Link href="">
                <RippleButton className="mt-3 text-lg font-medium hover:bg-white/70 bg-white border-none text-secondary">
                  Start Journey Today
                </RippleButton>
              </Link>
            </div>
          </div>
          </motion.div>
      </section>
    </div>
  );
}
