import React from 'react'
import GradientText from '@/components/react-bits-ui/GradientText'
import { getAssessments } from '@/action/interview'
import StatsCards from './_components/stats-cards'
import QuizList from './_components/quiz-list'
import PerformanceChart from './_components/performance-charts'


const InterviewPage = async () => {
  //fetching assesments from server action
  const assesments = await getAssessments();
  
  return (
    <div>
      <div>
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
