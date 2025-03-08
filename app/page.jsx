"use client";
import Aurora from "@/components/react-bits-ui/Aurora";
import HeroSection from "@/components/hero-section";
import { features } from "@/data/features";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SpotlightCard from "@/components/react-bits-ui/SpotLightCard"
import GradientText from "@/components/react-bits-ui/GradientText";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { motion, useScroll, useSpring } from "framer-motion";
import ClickSpark from "@/components/react-bits-ui/ClickSpark"
import Iridescence from "@/components/react-bits-ui/RideScene"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef, useState } from "react";
import { faqs } from "@/data/faqs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Lenis from '@studio-freight/lenis';

export default function Home() {
  const scrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if user is on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();

    // Add event listener for resizing
    window.addEventListener('resize', checkMobile);


    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 50
    });

    // Initialize Lenis with mobile-optimized settings
    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.2, // Reduced duration on mobile
      easing: (t) => (isMobile ?
        // Simpler easing function for mobile
        Math.min(1, 1.001 - Math.pow(2, -10 * t)) :
        // Original easing for desktop
        Math.min(1, 1.001 - Math.pow(2, -10 * t))
      ),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false, // Disable smooth touch on mobile for better performance
      touchMultiplier: 1.5, // Reduced from 2
      infinite: false,
      // Throttle to reduce calculations on mobile
      wheelEventsTarget: isMobile ? document.documentElement : window,
    });

    // More efficient RAF implementation
    let rafId = null;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Clean up
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      lenis.destroy();
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  // Progress bar for scroll
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.01
  });

  // Virtualize the number of animated items on mobile
  const visibleFeatures = isMobile ? features.slice(0, 4) : features;
  const visibleWorkItems = isMobile ? howItWorks.slice(0, 4) : howItWorks;
  const visibleFaqs = isMobile ? faqs.slice(0, 6) : faqs;

  return (
    <div className="" ref={scrollRef}>
      {/* Progress Bar - Fixed at top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Home Section */}
      <div className="absolute inset-0 -z-10">
        <Aurora
          colorStops={["#00D8FF", "#16567E", "#00D8FF"]}
          blend={1}
          amplitude={isMobile ? 1 : 2} // Reduced animation complexity on mobile
          speed={isMobile ? 0.3 : 0.5} // Slower animation on mobile
        />
      </div>
      <HeroSection />

      {/* Feature Section */}
      <section className="w-full pb-12 bg-background" id="features">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold tracking-tighter text-center mb-12 gradient-title">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={isMobile ? 2 : 3} // Slowed animation on mobile
                showBorder={false}
                className="custom-class overflow-visible"
              >Powerful Features for Your Career Growth</GradientText>
            </motion.div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {visibleFeatures.map((feature, index) => {
              // Simplified animation on mobile
              const delay = isMobile ? Math.min(index * 50, 150) : index * 100;
              return (
                <div data-aos="fade-up" data-aos-delay={delay} className="flex h-full" key={`feature-${index}`}>
                  <SpotlightCard className="border-2 hover:border-[#00D8FF] transition-colors duration-300 flex items-center justify-center" spotlightColor="rgba(0, 229, 255, 0.2)">
                    <CardContent className="p-6 text-center">
                      <div className="flex flex-col items-center justify-center">
                        {feature.icon}
                        <h3 className="text-xl font-semibold mb-2"> {feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </CardContent>
                  </SpotlightCard>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Statstic Section */}
      <section className="relative rounded-md antialiased w-full py-12 md:py-24 overflow-hidden" id="statistics">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-center">
          <div className="flex md:flex-row flex-col gap-6 justify-between items-center text-center w-[80%] mx-auto">
            <div data-aos="fade-up" data-aos-delay="100" data-aos-duration={isMobile ? 400 : 700} className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-5xl font-bold gradient-title">50+</h3>
              <p className="text-muted-foreground text-xl">Industries Covered</p>
            </div>

            <div data-aos="fade-up" data-aos-delay="200" data-aos-duration={isMobile ? 400 : 700} className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-5xl font-bold gradient-title">1000+</h3>
              <p className="text-muted-foreground text-xl">Interview Question</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="300" data-aos-duration={isMobile ? 400 : 700} className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-5xl font-bold gradient-title">95%</h3>
              <p className="text-muted-foreground text-xl">Success Rate</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="400" data-aos-duration={isMobile ? 400 : 700} className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-5xl font-bold gradient-title">24/7</h3>
              <p className="text-muted-foreground text-xl">AI Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Working Section */}
      <section className="w-full pt-12 bg-background" id="how-it-works">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-between">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: isMobile ? 0.5 : 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold mb-4">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={isMobile ? 2 : 3}
                  showBorder={false}
                  className="custom-class overflow-visible"
                >How It Works</GradientText>
              </h2>
              <p className="text-muted-foreground text-xl">Four simple steps to accelerate your career growth</p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
            {visibleWorkItems.map((item, index) => {
              const delay = isMobile ? Math.min(index * 50, 150) : index * 100;
              return (
                <div data-aos="fade-up" data-aos-delay={delay} key={`work-${index}`}>
                  <NeonGradientCard className="flex max-w-sm items-center justify-center text-center flex-col space-y-2">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">{item.icon}</div>
                    <h3 className="font-semibold text-xl">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </NeonGradientCard>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonals Section */}
        <div className="container mx-auto px-4 md:px-6 py-14 mt-4">
          <h2 className="text-4xl font-bold tracking-tighter text-center mb-12 gradient-title">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={isMobile ? 2 : 3}
                showBorder={false}
                className="custom-class overflow-visible"
              >What Our Users Say</GradientText>
            </motion.div>
          </h2>
          <AnimatedTestimonials testimonials={testimonial} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 bg-background" id="faqs">
        <div className="container mx-auto px-6">
          <div className="text-center mx-auto mb-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: isMobile ? 0.5 : 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold mb-4">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={isMobile ? 2 : 3}
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
              sparkSize={isMobile ? 5 : 10}
              sparkRadius={isMobile ? 10 : 15}
              sparkCount={isMobile ? 4 : 8}
              duration={isMobile ? 300 : 400}
            >
              <Accordion type="single" collapsible>
                {visibleFaqs.map((faq, index) => {
                  const delay = isMobile ? 0 : index * 50;
                  return (
                    <div data-aos="fade-up" data-aos-delay={delay} key={`faq-${index}`}>
                      <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger className={"text-xl font-thin text-slate-200"}>{faq.question}</AccordionTrigger>
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

      {/* Start your journey section */}
      <section className="w-full pt-6 bg-background"  id="start-journey">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
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

            <div className="p-4 absolute inset-0 flex flex-col items-center text-center justify-center z-10">
              <h1 className="text-white text-4xl font-bold">Ready to Accelerate Your Career?</h1>
              <p className="mx-auto text-xl text-primary">
                Join thousands of professionals who are advancing their careers
              </p>
              <Link href="/">
                <Button className="mt-3 text-lg font-medium hover:bg-white/70 bg-white border-none text-secondary">
                  Start Journey Today
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}