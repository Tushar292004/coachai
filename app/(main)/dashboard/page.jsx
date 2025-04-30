//this is server component 
import { getIndustryInsights } from '@/action/dashboard'
import { getUserOnboardingStatus } from '@/action/user'
import { redirect } from 'next/navigation'
import React from 'react'
import DashboardView from './_components/dashboardView'

const IndustryInsightPage = async () => {
  // check if user is already onboarded
  const { isOnboarded } = await getUserOnboardingStatus()
  if (!isOnboarded) {
    // if user is not onboarded then redirect to onboarding page
    redirect('/onboarding')
  }

  // get industry insights from database : from server actio {dashbaord.js} it will give json result
  const insights = await getIndustryInsights();

  return (
    <div className='container mx-auto  '>
      {/* this will be client component */}
      <DashboardView insights={insights}/>
    </div>
  )
}

export default IndustryInsightPage
