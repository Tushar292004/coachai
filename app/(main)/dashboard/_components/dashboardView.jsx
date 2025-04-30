'use client'
import { Brain, BriefcaseIcon, Factory, LineChart, TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'
import { format, formatDate, formatDistanceToNow } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import SpotlightCard from '@/components/react-bits-ui/SpotLightCard'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion, useScroll, useSpring } from "framer-motion";

const DashboardView = ({ insights }) => {

  // variable storing salary data in an array of objects for charts
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }))

  // variable holding demand level
  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'bg-green-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  // for holding marketOutlook data
  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case 'positive':
        return { icon: TrendingUp, color: 'text-green-500' };
      case 'neutral':
        return { icon: LineChart, color: 'text-yellow-500' };
      case 'negative':
        return { icon: TrendingDown, color: 'text-red-500' };
      default:
        return { icon: LineChart, color: 'text-gray-500' };
    }
  }
  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const OutlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  const getGrowthRateColor = (rate) => {
    if (rate < 30) return 'bg-red-500';
    if (rate < 60) return 'bg-yellow-500';
    if (rate < 80) return 'bg-green-500';
    return 'bg-blue-500';
  };

  const OutlookbgColor = getGrowthRateColor(insights.growthRate);


  //lastupdate date
  const lastUpdatedDate = format(new Date(insights.lastUpdated), 'dd-MM-yyyy');

  //nextUpdate Date
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate), { addSuffix: true });


  return (
    <motion.div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <Badge variant="secondary" className="text-sm font-semibold">Last updated : {lastUpdatedDate}</Badge>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>

          {/* Market outlook */}
          <SpotlightCard className="border hover:border-[#00D8FF] transition-colors duration-300 p-4" spotlightColor="rgba(0, 229, 255, 0.2)">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Market Outlook</CardTitle>
              <OutlookIcon className={`h-5 w-5 ${OutlookColor}`} />
            </CardHeader>
            <CardContent className="">
              <div className='text-2xl font-bold'>{insights.marketOutlook}</div>
              <p className="text-xs  text-muted-foreground">
                Next update {nextUpdateDistance}
              </p>
            </CardContent>
          </SpotlightCard>

          {/* Industry Growth*/}
          <SpotlightCard className="border hover:border-[#00D8FF] transition-colors duration-300 p-4" spotlightColor="rgba(0, 229, 255, 0.2)">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Industry Growth</CardTitle>
              <Factory className={`h-5 w-5 text-muted-foreground`} />
            </CardHeader>
            <CardContent className="">
              <div className='text-2xl font-bold'>
                {insights.growthRate.toFixed(1)}%
              </div>
              <Progress value={insights.growthRate} indicator={OutlookbgColor} className={`mt-2 `} />
            </CardContent>
          </SpotlightCard>

          {/* Demand Level */}
          <SpotlightCard className="border hover:border-[#00D8FF] transition-colors duration-300 p-4" spotlightColor="rgba(0, 229, 255, 0.2)">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Demand Level</CardTitle>
              <BriefcaseIcon className={`h-5 w-5 text-muted-foreground`} />
            </CardHeader>
            <CardContent className="">
              <div className="text-2xl font-bold ">
                {insights.demandLevel.toUpperCase()}
              </div>
              <Progress value={100} indicator={getDemandLevelColor(insights.demandLevel)} className={`h-2 w-full rounded-full mt-2`} />
            </CardContent>
          </SpotlightCard>

          {/* Top Skills */}
          <SpotlightCard className="border hover:border-[#00D8FF] transition-colors duration-300 p-4" spotlightColor="rgba(0, 229, 255, 0.2)">
            <CardHeader className="flex flex-row items-center justify-between space-y- pb-2">
              <CardTitle className="text-md font-medium">Top Skills</CardTitle>
              <Brain className={`h-5 w-5 text-[#00D8FF]`} />
            </CardHeader>
            <CardContent className="">
              <div className='flex flex-wrap gap-2'>
                {insights.topSkills.map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </SpotlightCard>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        {/* Salary Ranges  */}
        <SpotlightCard className="border hover:border-[#00D8FF] transition-colors duration-300 p-4 flex flex-col" spotlightColor="rgba(0, 229, 255, 0.2)">
          <CardHeader className="">
            <CardTitle className="text-2xl">Salary Ranges by Role</CardTitle>
            <CardDescription>Displaying minimum, median, and mazimum salaries (in thousands)</CardDescription>
          </CardHeader>
          <CardContent className="">
            <div className="h-[400px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salaryData}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background p-2 rounded-lg shadow-md border">
                          <p className="font-mediun">{label}</p>
                          {payload.map((item,) => (
                            <p key={item.name} className="text-sm">{item.name}: ${item.value}K</p>
                          ))}
                        </div>
                      )
                    }

                    return null;
                  }} />
                  <Legend />
                  <Bar dataKey="min" fill="#94a3b8" name="Min Salary (K)" />
                  <Bar dataKey="median" fill="#64748b" name="Median Salary (K)" />
                  <Bar dataKey="max" fill="#475569" name="Max Salary (K)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </SpotlightCard>
      </motion.div>



      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <SpotlightCard className="border hover:border-[#00D8FF] transition-colors duration-300 p-4" spotlightColor="rgba(0, 229, 255, 0.2)">
          <CardHeader >
            <CardTitle className="text-2xl">Key Industry Trends</CardTitle>
            <CardDescription>Stay ahead with the latest trends in your industry</CardDescription>
          </CardHeader>
          <CardContent className="m-2">
            <ul className="space-y-2">
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className='flex items-start space-x-2'>
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary">
                  </div>
                  <span>{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </SpotlightCard>

        <SpotlightCard className="border hover:border-[#00D8FF] transition-colors duration-300 p-4" spotlightColor="rgba(0, 229, 255, 0.2)">
          <CardHeader >
            <CardTitle className={"text-2xl"}>Recommended Skills </CardTitle>
            <CardDescription>Skills to consider developing </CardDescription>
          </CardHeader>
          <CardContent className="">
            <div className="flex flex-wrap gap-2 mt-2">
              {insights.recommendedSkills.map((skill)=>(
                <Badge key={skill} variant="secondary" className={"text-xl"}>{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </SpotlightCard>
      </motion.div>

    </motion.div>
  )
}

export default DashboardView
