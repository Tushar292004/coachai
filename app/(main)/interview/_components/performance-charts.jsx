'use client'
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SpotlightCard from '@/components/react-bits-ui/SpotLightCard'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PerformanceChart = ({ assesments }) => {
    //creating a usestate for chart data
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        if (assesments) {
            const formattedData = assesments.map((assessment) => ({
                //we want date 
                date: format(new Date(assessment.createdAt), "MMM dd"),
                //we want score
                score: assessment.quizScore,
            }))
            setChartData(formattedData);
        }
    }, [assesments])

    return (
        <div className="">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
            >
                {/* Performance Chart  */}
                <SpotlightCard className="border hover:border-[#00D8FF] transition-colors duration-300 md:p-4 p-2 flex flex-col" spotlightColor="rgba(0, 229, 255, 0.2)">
                    <CardHeader className="">
                        <CardTitle className="text-2xl">Performance Trend</CardTitle>
                        <CardDescription>Displaying performance trend over time in quizes</CardDescription>
                    </CardHeader>
                    <CardContent className="">
                        <div className="h-[300px] mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={chartData}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis domain={[0, 100]}/>
                                    <Tooltip content={({ active, payload }) => {
                                        if (active  && payload?.length) {
                                            return (
                                                <div className="bg-background p-2 rounded-lg shadow-md border">
                                                    <p className="font-mediun">score: {payload[0].value}%</p>
                                                    <p className="font-mediun">date: {payload[0].payload.date}</p>
                                                </div>
                                            )
                                        }

                                        return null;
                                    }} />
                                    <Legend />
                                    <Line dataKey="score" stroke="#94a3b8" type={"monotone"} strokeWidth={2} />
                                    
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </SpotlightCard>
            </motion.div>
        </div>
    )
}

export default PerformanceChart;