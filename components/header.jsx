import React from 'react'
import { SignInButton, SignUpButton, SignedOut, UserButton, SignedIn } from '@clerk/nextjs'
import Link from 'next/link'
import RotatingText from './react-bits-ui/RotatingText'
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from 'lucide-react'
import {Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import {InteractiveHoverButton} from '@/components/magicui/interactive-hover-button'

function Header() {
    return (
        <header className='fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60'>
            <nav className='container mx-auto px-4 h-16 flex items-center justify-between '>
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

                <div className='flex  items-center space-x-2 md:space-x-4'>
                    <SignedIn>
                        <Link href={"/dashbaord"}>
                            <Button variant="outline">
                                <LayoutDashboard className='h-4 w-4' />
                                <span className='hidden md:block'>  Industry Insights </span>
                            </Button>
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button>
                                    <StarsIcon className='h-4 w-4' />
                                    <span className='hidden md:block'>  Growth Tools </span>
                                    <ChevronDown className='h-4 w-4' />

                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>
                                <DropdownMenuItem><Link href={"/resume"} className='flex items-center gap-2'>
                                    <FileText className='h-4 w-4' />
                                    <span>  Build Resume </span>
                                </Link></DropdownMenuItem>

                                <DropdownMenuItem><Link href={"/ai-cover-letter"} className='flex items-center gap-2'>
                                    <PenBox className='h-4 w-4' />
                                    <span> Cover Letter</span>
                                </Link></DropdownMenuItem>
                                <DropdownMenuItem><Link href={"/interview"} className='flex items-center gap-2'>
                                    <GraduationCap className='h-4 w-4' />
                                    <span>Interview Prep</span>
                                </Link></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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

export default Header
