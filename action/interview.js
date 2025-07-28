"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

GoogleGenerativeAI

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel(
    {
        model: "gemini-1.5-flash",
    }
)

// server action for generating the quiz
export async function generateQuiz() {
    //checking weather user is already logged in or not
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not logged in (Unauthorized)");
    }


    //checking if user is registered inside the database or not
    const user = await db.user.findUnique({
        //find the using clerk user Id
        where: {
            clerkUserId: userId,
        }
    });
    if (!user) {
        throw new Error("User not found (Unregistered)");
    }

    try {
        // Prompt for generating quiz
        const prompt = `
    Generate 20 technical interview questions for a ${user.industry
            } professional${user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
            }.
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;

        // Use the AI model to generate content based on the prompt
        const result = await model.generateContent(prompt);

        // Extract the response from the AI model
        const response = result.response;

        // Get the text content of the response
        const text = response.text();

        // Clean the text by removing any markdown formatting or code block markers
        const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();


        const quiz = JSON.parse(cleanedText);
        return quiz.questions;

    } catch (error) {
        console.error("Error generating quiz:", error);
        throw new Error("Failed to generate quiz");
    }
}


//server action for saving the result of quiz
export async function saveQuizResult(questions, answers,score){
    //checking weather user is already logged in or not
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not logged in (Unauthorized)");
    }


    //checking if user is registered inside the database or not
    const user = await db.user.findUnique({
        //find the using clerk user Id
        where: {
            clerkUserId: userId,
        }
    });
    if (!user) {
        throw new Error("User not found (Unregistered)");
    }

    const questionResults = questions.map((q, index)=>({
        question: q.question,
        answer: q.correctAnswer,
        userAnswer: answers[index],
        isCorrect: answers[index] === q.correctAnswer,
        explanation: q.explanation,
    }));

    const wrongAnswers = questionResults.filter((q) => !q.isCorrect)
    let improvementTip = null;

    if(wrongAnswers.length > 0){
        const wrongQuestionsText = wrongAnswers.map((q)=> 
        `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`).join("\n\n");

    //prompt for generating feedback
     const improvementPrompt = `
      The user got the following ${user.industry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 3 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;    
    
    try {
        // Use the AI model to generate content based on the prompt
        const result = await model.generateContent(improvementPrompt);

        // Extract the response from the AI model
        const response = result.response;

        // Get the text content of the response
        improvementTip = response.text().trim();
               
    } catch (error) {
        console.error("Error generating improvement tip:", error);
        throw new Error("Failed to generate improvement tip");
    }

    try {
        const assessment = await db.assessment.create({
            data:{
                userId: user.id,
                quizScore: score,
                questions: questionResults,
                category: "Technical",
                improvementTip: improvementTip,
            }
        })

        return assessment;
    } catch (error) {
        console.error("Error saving quiz result:", error);
        throw new Error("Failed to save quiz result");
    }

    }
}


//server action for getting the result of quiz
export async function getAssessments(){
    //checking weather user is already logged in or not
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not logged in (Unauthorized)");
    }


    //checking if user is registered inside the database or not
    const user = await db.user.findUnique({
        //find the using clerk user Id
        where: {
            clerkUserId: userId,
        }
    });
    if (!user) {
        throw new Error("User not found (Unregistered)");
    }

    //fetching the assessment data from the database
    try {
        const assessments = await db.assessment.findMany({
            where: {
                userId: user.id,
            },
            orderBy:{
                createdAt: "asc",
            }
        })
        
        return assessments;
    } catch (error) {
        console.error("Error getting quiz result:", error);
        throw new Error("Failed to get quiz result");
    }
}