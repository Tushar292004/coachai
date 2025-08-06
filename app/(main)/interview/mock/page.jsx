import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import GradientText from '@/components/react-bits-ui/GradientText'
import Quiz from '../_components/quiz'

const MockInterviewPage = () => {
  return (
    <div className=''>
      <div className='flex flex-col items-start justify-between mb-3 '>
        <Link href={"/interview"}>
          <Button variant={"link"} className={"gap-2 pl-0"}>
            <ArrowLeft className='h-4 w-4' />
            Back to Interview Preparation
          </Button>
        </Link>
        {/* <h1 className='text-6xl font-bold gradient-title'>Industry Insight</h1> */}
        <h1><GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={8}
          showBorder={false}
          className="text-4xl md:text-5xl  font-bold"
        >Mock Interview</GradientText></h1>
        <p className="text-muted-foreground">Test your knowledge with industry specific questions</p>
      </div>
    <Quiz/>
    </div>
  )
}

export default MockInterviewPage
