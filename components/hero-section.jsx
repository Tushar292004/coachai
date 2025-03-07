"use client";
import { Button } from './ui/button'
import Link from 'next/link'
import { ContainerScroll } from './ui/container-scroll-animation'
import Image from 'next/image'
import heroImage from "../public/hero.png";
import GradientText from '@/components/react-bits-ui/GradientText'



export default function HeroSection() {
    return (
        <section className='w-full pt-36 md:pt-48 p-2 h-auto'>
            <div className='space-y-6 text-center'>
                <div className='space-y-6 mx-auto'>
                    <h1 className='text-4xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title '>
                        Your AI Career Coach For <br />Professional Success
                    </h1>
                    <p className='mx-auto max-w-[600px] text-muted-foreground md:text-2xl'>Advance your career with personalized guidance, interview prep, and AI-powered tools for job success</p>
                </div>
                <div className='flex justify-center space-x-4'>
                    <Link href='/dashboard'>
                        <Button size="lg" className="px-8">
                            Get Started
                        </Button>
                    </Link>
                    <Link href='/dashboard'>
                        <Button size="lg" className="px-8" variant="outline">
                            Get Started
                        </Button>
                    </Link>
                </div>

                <div className="flex flex-col overflow-hidden pt-10">
                    <ContainerScroll
                        titleComponent={
                            <>
                                <h1 className="gradient-title text-4xl font-semibold">
                                    Unleash the power of <br />
                                    <span className="text-4xl md:text-[6rem] mt-1 leading-none">
                                        <GradientText
                                            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                                            animationSpeed={3}
                                            showBorder={false}
                                            className="custom-class overflow-visible"
                                        >
                                            AI Coach
                                        </GradientText>
                                    </span>

                                </h1>
                            </>
                        }
                    >
                        <Image
                            src={heroImage}
                            alt="hero"
                            height={720}
                            width={1400}
                            className="mx-auto rounded-2xl object-cover h-full object-left-top"
                            draggable={false}
                            priority
                        />
                    </ContainerScroll>
                </div>
            </div>
        </section>
    )
}
