import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Trophy, XCircle } from 'lucide-react';
import React from 'react'

const QuizResult = ({result, hideStartNew = false, onStartNew}) => {
    if(!result) return null;
    return (
    <div className='mx-auto'>
      <h1 className='flex items-center gap-2 text-3xl gradient-title'>
        <Trophy className='h-6 w-6 text-yellow-500' />
        Quiz Results
      </h1>

      <CardContent className={"space-y-6"}>
        {/* Score Board */}
        <div className="text-center space-y-2 mb-2">
            <h3 className="text-2xl font-bold">{result.quizScore.toFixed(1)}%</h3>
            <Progress value={result.quizScore} className={"w-full"} />
        </div>

        {/*Improvement Tip*/}
        {result.improvementTip && (
            <div className="bg-muted px-4 py-2 mb-2 rounded-lg">
                <p className="bg-muted  rounded-lg">Improvement Tip:</p>
                <p className="text-muted-foreground">{result.improvementTip}</p>
            </div>
        )}

        <div className="space-y-4 mb-2">
            <h3 className='font-medium'>Question Review</h3>
            {result.questions.map((q, index)=>(
                <div className='border rounded-lg p-4 space-y-2' key={index}>
                    <div className='felx items-start justify-normal gap-2'>
                        <p className="font-medium">{q.question}</p>
                        {q.isCorrect ? (
                            <CheckCircle2 className='h-5 w-5 text-green-500 flex-shrink-0'/>
                        ):( <XCircle className="h-5 w-5 text-red-500" />
                        )}
                    </div>

                    <div className="text-sm text-muted-foreground">
                        <p>Your answer: {q.userAnswer}</p>
                        {!q.isCorrect && <p>Correct answer: {q.answer}</p>}
                    </div>

                    <div className="text-sm bg-muted p-2 rounded">
                        <p className="font-medium">Explanation: </p>
                        <p>{q.explanation}</p>
                    </div>
                </div>
            ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter>
            <Button onClick={onStartNew} className={"w-full mt-4"}>
                Start New Quiz
            </Button>
        </CardFooter>
      )}
    </div>
  )
}

export default QuizResult
