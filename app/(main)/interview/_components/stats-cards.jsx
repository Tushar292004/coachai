'use client'
import SpotlightCard from '@/components/react-bits-ui/SpotLightCard'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion';
import { Brain, Trophy, LineChart } from 'lucide-react';

const StatsCards = ({assesments}) => {

    //calculating average score
    const getAverageScore = ()=>{
        //checking we have assesments or not
        if(!assesments?.length) return 0;

        //calculating total score
        const total = assesments.reduce(
            //sum is accumilator which will be getting incremented 
            (sum, assesment) => sum+ assesment.quizScore, 0
        );
        return (total/ assesments.length).toFixed(1);
    }

    //get latest assessments
    const getLatedAssessment = ()=>{
        if(!assesments?.length) return null;
        return assesments[0];
    }

    //get total number of questions
    const getTotalQuestions = ()=>{
        if( !assesments?.length) return 0;
        return assesments.reduce(
            (sum, assesment)=> sum + assesment.questions.length, 0);
    }

    return (
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/* Average Score */}
          <SpotlightCard className="border hover:border-[#00D8FF] transition-colors duration-300 p-4" spotlightColor="rgba(0, 229, 255, 0.2)">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Average Score</CardTitle>
              <Trophy className={`h-4 w-4 text-muted-foreground`} />
            </CardHeader>
            <CardContent className="">
              <div className='text-2xl font-bold'>{getAverageScore()+"%"}</div>
              <p className="text-xs  text-muted-foreground">
              Across all quizes
              </p>
            </CardContent>
          </SpotlightCard>

          {/* Questions Practised */}
          <SpotlightCard className="border hover:border-[#00D8FF] transition-colors duration-300 p-4" spotlightColor="rgba(0, 229, 255, 0.2)">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Questions Practised</CardTitle>
              <Brain className={`h-4 w-4 text-muted-foreground`} />
            </CardHeader>
            <CardContent className="">
              <div className='text-2xl font-bold'>{getTotalQuestions()}</div>
              <p className="text-xs  text-muted-foreground">
              Across all quizes
              </p>
            </CardContent>
          </SpotlightCard>

          {/* Latest Score */}
          <SpotlightCard className="border hover:border-[#00D8FF] transition-colors duration-300 p-4" spotlightColor="rgba(0, 229, 255, 0.2)">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Latest Quiz Score</CardTitle>
              <LineChart className={`h-4 w-4 text-muted-foreground`} />
            </CardHeader>
            <CardContent className="">
              <div className='text-2xl font-bold'>{getLatedAssessment()?.quizScore.toFixed(1) || 0}%</div>
              <p className="text-xs  text-muted-foreground">
              Most recent quiz
              </p>
            </CardContent>
          </SpotlightCard>


        </div>
        </motion.div>
    )
}

export default StatsCards;