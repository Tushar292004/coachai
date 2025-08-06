import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners'
import GradientText from '@/components/react-bits-ui/GradientText'

const Layout = ({ children }) => {
    return (
        <div className='px-5'>

            <Suspense fallback={
                <BarLoader className="mt-4" width={"100%"} color="gray" />}>{children}
            </Suspense>
        </div>
    )
}

export default Layout
