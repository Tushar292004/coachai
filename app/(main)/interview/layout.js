import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners'
import GradientText from '@/components/react-bits-ui/GradientText'

const Layout = ({ children }) => {
    return (
        <div className='px-5'>
            <div className='flex items-center justify-between mb-3 '>
            <h1><GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={8}
                  showBorder={false}
                  className="text-4xl md:text-6xl font-bold"
                >Interview Preparation</GradientText></h1>

                {/* <h1 className='text-6xl font-bold gradient-title'>Industry Insight</h1> */}
            </div>
            <Suspense fallback={
                <BarLoader className="mt-4" width={"100%"} color="gray" />}>{children}
            </Suspense>
        </div>
    )
}

export default Layout
