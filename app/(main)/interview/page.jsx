import { getAssessments } from '@/action/interview'
import StatsCards from './_components/stats-cards'
import QuizList from './_components/quiz-list'
import PerformanceChart from './_components/performance-charts'
import React from 'react'
import GradientText from '@/components/react-bits-ui/GradientText'


const InterviewPage = async () => {
  //fetching assesments from server action
  const assesments = await getAssessments();

  return (
    <div>
      <div>
        <div className=''>
          <div className='flex items-center justify-between mb-3 '>
            <h1><GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={8}
              showBorder={false}
              className="text-3xl md:text-6xl font-bold"
            >Interview Preparation</GradientText></h1>

            {/* <h1 className='text-6xl font-bold gradient-title'>Industry Insight</h1> */}
          </div>
        </div>
        <div className='space-y-6'>
          <StatsCards assesments={assesments} />
          <PerformanceChart assesments={assesments} />
          <QuizList assesments={assesments} />

        </div>
      </div>
    </div>
  )
}

export default InterviewPage
