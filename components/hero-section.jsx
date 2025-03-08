"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GradientText from '@/components/react-bits-ui/GradientText'
import { motion } from 'framer-motion';
import AOS from "aos";
import "aos/dist/aos.css";

const HeroSection = () => {
    const imageRef = useRef(null);
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);


    useEffect(() => {
        const imageElement = imageRef.current;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;

            if (scrollPosition > scrollThreshold) {
                imageElement.classList.add("scrolled");
            } else {
                imageElement.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="w-full pt-36 md:pt-48 pb-10 bg-transparent">
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }} // Hidden at first
                    whileInView={{ opacity: 1, y: 0 }} // Triggers when in view
                    viewport={{ once: false }} // Runs only once
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <div className='space-y-6 mx-auto '>
                        <h1 className='text-3xl font-bold md:text-6xl lg:text-7xl xl:text-8xl '>
                            Your AI Career Coach For <br />Professional Success
                        </h1>
                        <p className='mx-auto max-w-[600px] text-muted-foreground md:text-2xl px-4'>Advance your career with personalized guidance, interview prep, and AI-powered tools for job success</p>
                    </div>
                    <div className='flex justify-center space-x-4 mt-8'>
                        <Link href='/dashboard'>
                            <Button data-aos="fade-up" size="lg" className="px-8">
                                Get Started
                            </Button>
                        </Link>
                        <Link href='/dashboard'>
                            <Button data-aos="fade-up" size="lg" className="px-8" variant="outline">
                                Watch Demo
                            </Button>
                        </Link>
                    </div>
                </motion.div>
                <div data-aos="fade-up">
                    <h1 className="gradient-title text-4xl font-semibold mt-24">
                        Unleash the power of <br />
                        <span className="text-4xl md:text-[6rem] mt-1 leading-none">
                            <GradientText
                                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                                animationSpeed={8}
                                showBorder={false}
                                className="custom-class overflow-visible"
                            >
                                AI Coach
                            </GradientText>
                        </span>
                    </h1>


                    <div className="hero-image-wrapper md:mt-0 px-4">
                        <div ref={imageRef} className="hero-image">
                            <Image
                                src="/hero.png"
                                width={1280}
                                height={720}
                                alt="Dashboard Preview"
                                className="rounded-lg shadow-2xl border mx-auto border-[#6C6C6C] p-2  bg-[#222222]"
                                priority
                            />
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
};

export default HeroSection;