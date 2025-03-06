import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ContainerScroll } from './ui/container-scroll-animation'
import Image from 'next/image'
import heroImage from "../public/hero.png";

<Image
  src={heroImage}
  alt="hero"
  height={720}
  width={1400}
  className="mx-auto rounded-2xl object-cover h-full object-left-top"
  draggable={false}
/>


export default function HeroSection() {


    return (
        <section className='w-full pt-36 md:pt-48 pb-10'>
            <div className='space-y-6 text-center'>
                <div className='space-y-6 mx-auto'>
                    <h1 className='text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title '>
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
                <div className="flex flex-col overflow-hidden">
                    <ContainerScroll
                        titleComponent={
                            <>
                                <h1 className="text-4xl font-semibold text-black dark:text-white">
                                    Unleash the power of <br />
                                    <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                                        Scroll Animations
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
                        />
                    </ContainerScroll>
                </div>
            </div>
        </section>
    )
}
