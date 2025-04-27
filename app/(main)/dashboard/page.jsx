import { getUserOnboardingStatus } from '@/action/user'
import { redirect } from 'next/navigation'
import React from 'react'

const IndustryInsightPage = async() => {
   // check if user is already onboarded
   const {isOnboarded}  = await getUserOnboardingStatus() 
      if (!isOnboarded) {
          // if user is already onboarded then redirect to dashboard
          redirect('/onboarding')
      }
  return (
    <div>
      IndustryInsights
    </div>
  )
}

export default IndustryInsightPage
