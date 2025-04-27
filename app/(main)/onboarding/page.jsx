import { industries } from '@/data/industries'
import React from 'react'
import OnboardingForm from './_components/onboarding_form'

const OnboardingPage = () => {
    // check if user is already onboarded

  return (
    <main>
      //Seprate component because it is a client component and we need to use `use client` in the component and we are sending data of industries to the component
      <OnboardingForm industries={industries} />
    </main>
  )
}

export default OnboardingPage
