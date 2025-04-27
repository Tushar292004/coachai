import { industries } from '@/data/industries'
import React from 'react'
import OnboardingForm from './_components/onboarding_form'
import { getUserOnboardingStatus } from '@/action/user'
import { redirect } from 'next/navigation'

// async because it is server component
const OnboardingPage =  async () => {
    // check if user is already onboarded
    const {isOnboarded}  = await getUserOnboardingStatus() 
    if (isOnboarded) {
        // if user is already onboarded then redirect to dashboard
        redirect('/dashboard')
    }

  return (
    <main>
      {/* //Seprate component because it is a client component and we need to use `use client` in the component and we are sending data of industries to the component */}
      <OnboardingForm industries={industries} />
    </main>
  )
}

export default OnboardingPage
