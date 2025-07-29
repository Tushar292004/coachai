'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import SpotlightCard from '@/components/react-bits-ui/SpotLightCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import QuizResult from "./quiz-results";

const QuizList = ({ assesments }) => {

    const router = useRouter();
    //state for selected quiz
    const [selectedQuiz, setSelectedQuiz] = useState(null);


    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
        >
            {/* Average Score */}
            <SpotlightCard className="border hover:border-[#00D8FF] transition-colors duration-300 md:p-4 p-2" spotlightColor="rgba(0, 229, 255, 0.2)">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-md font-medium">Recent Quizes</CardTitle>
                        <CardDescription> Review your past quizes performance </CardDescription>
                    </div>
                    <Button onClick={()=> router.push("/interview/mock")}>Start New Quiz</Button>
                </CardHeader>
                <CardContent className="mt-4">
                    <div className="space-y-4">
                        {assesments?.map((assessment, index)=> {
                            return (
                                <Card className={"cursor-pointer hover:bg-muted/50 transition-colors"}
                                key={assessment.id}
                                onClick={()=> setSelectedQuiz(assessment)}
                                >
                                    <CardHeader>
                                        <CardTitle>Quiz {index + 1}</CardTitle>
                                        <CardDescription className="flex justify-between w-full">
                                            <div>Score: {assessment.quizScore.toFixed(1)}%</div>
                                            <div>{format(new Date(assessment.createdAt), "MMMM dd, yyyy HH:mm")}</div>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground max-h-[150px] overflow-y-auto">
                                            {assessment.improvementTip}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
})}
                    </div>
                </CardContent>
            </SpotlightCard>

            {/* dialog */}
            <Dialog open={!!selectedQuiz} onOpenChange={()=> setSelectedQuiz(null)}>
                <DialogContent className={"max-w-4xl max-h-[90vh] overflow-y-auto"}>
                    <DialogHeader><DialogTitle></DialogTitle></DialogHeader>
                    <QuizResult result={selectedQuiz} onStartNew={()=> router.push("/interview/mock")} hideStartNew/>
                </DialogContent>
            </Dialog>
        </motion.div>
    )
}

export default QuizList;