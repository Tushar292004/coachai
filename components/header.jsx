import React from 'react'
import { SignInButton, SignUpButton, SignedOut, UserButton, SignedIn } from '@clerk/nextjs'
import Link from 'next/link'
import RotatingText from './react-bits-ui/RotatingText'
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, Menu, PenBox, StarsIcon } from 'lucide-react'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { checkUser } from '@/lib/checkUser'
import { BoxReveal } from "@/components/magicui/box-reveal";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from './ui/separator'


export default async function Header() {
    await checkUser()
    return (
        <header className='fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60'>
            <nav className='px-4 h-16 flex items-center justify-between '>
                <Link href="/" className='flex gap-2 items-center'>
                    <p className='text-2xl font-md'>Coach</p>
                    <RotatingText
                        texts={['AI', 'MockTest', 'Resume', 'CoverLetter']}
                        mainClassName="px-2 sm:px-2 md:px-3 bg-[#00D8FF] text-black font-semibold text-lg overflow-hidden justify-center rounded-lg"
                        staggerFrom={"last"}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={2000}
                    />
                </Link>

                {/* Action buttons */}
                <div className='flex  items-cente align-middle space-x-2 md:space-x-4'>
                    <SignedIn>
                        <div className='md:hidden'>
                            <Sheet>
                                <SheetTrigger>
                                    <Menu className='h-7 w-7 mt-2 mr-2 hover:text-muted-foreground' />
                                </SheetTrigger>
                                <SheetContent className={""}>
                                    <SheetHeader>
                                        <SheetTitle className={"text-2xl text-[#00d8ff]"}>Side Bar</SheetTitle>
                                    </SheetHeader>
                                    <Separator />
                                    <div className='flex flex-col space-y-4  mt-4 text-xl'>
                                        <Link href="/resume" className="flex  pl-4 items-center gap-4 hover:text-[#00D8FF]">
                                        <BoxReveal><FileText className="h-4 w-4" /> <span>Build Resume</span></BoxReveal>
                                            
                                        </Link>
                                        <Separator />
                                        <Link href="/ai-cover-letter" className="flex pl-4 items-center gap-4 hover:text-[#00D8FF]">
                                        <BoxReveal><PenBox className="h-4 w-4" /> <span>Cover Letter</span></BoxReveal>
                                            
                                        </Link>
                                        <Separator />
                                        <Link href="/interview" className="flex  pl-4 items-center gap-4 hover:text-[#00D8FF]">
                                        <BoxReveal><GraduationCap className="h-4 w-4" /> <span>Interview Prep</span></BoxReveal>
                                            
                                        </Link>
                                        <Separator />
                                        <Link href="/dashboard" className="flex pl-4 items-center gap-4 hover:text-[#00D8FF]">
                                        <BoxReveal><LayoutDashboard className="h-4 w-4" /> <span>Industry Insights</span></BoxReveal>
                                            
                                        </Link>
                                        <Separator />
                                    </div>
                                </SheetContent>
                            </Sheet>

                        </div>
                        <div className='hidden md:flex items-center space-x-2'>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="flex items-center gap-2">
                                        <StarsIcon className='h-4 w-4' />
                                        <span className='hidden md:block'>  Growth Tools </span>
                                        <ChevronDown className='h-4 w-4' />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild><Link href={"/resume"} className='flex items-center gap-2'>
                                        <FileText className='h-4 w-4' />
                                        <span>  Build Resume </span>
                                    </Link></DropdownMenuItem>

                                    <DropdownMenuItem asChild><Link href={"/ai-cover-letter"} className='flex items-center gap-2'>
                                        <PenBox className='h-4 w-4' />
                                        <span> Cover Letter</span>
                                    </Link></DropdownMenuItem>
                                    <DropdownMenuItem asChild><Link href={"/interview"} className='flex items-center gap-2'>
                                        <GraduationCap className='h-4 w-4' />
                                        <span>Interview Prep</span>
                                    </Link></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Link href={"/dashboard"}>
                                <Button variant="outline" className="">
                                    <LayoutDashboard className='h-4 w-4' />
                                    <span className='hidden md:inline-flex items-center gap-2'>  Industry Insights </span>
                                </Button>
                            </Link>
                        </div>


                    </SignedIn>
                    <SignedOut>
                        <SignInButton>
                            <InteractiveHoverButton>Sign In</InteractiveHoverButton>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10",
                                    userButtonPopoverCard: "shadow-xl",
                                    userPreviewMainIdentifier: "font-semibold"
                                }
                            }}
                            afterSignOutUrl='/'
                        />
                    </SignedIn>
                </div>
            </nav>
        </header>
    )
}
