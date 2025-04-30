"use server"
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel(
    {
        model: "gemini-1.5-flash",
    }
)

// Function to generate AI insights for a given industry
export const generateAIInsights = async (industry) => {
    // Define the prompt to be sent to the AI model
    const prompt = `
    Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
  `;

    // Use the AI model to generate content based on the prompt
    const result = await model.generateContent(prompt);

    // Extract the response from the AI model
    const response = result.response;

    // Get the text content of the response
    const text = response.text();

    // Clean the text by removing any markdown formatting or code block markers
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    // Parse the cleaned text into a JSON object and return it
    return JSON.parse(cleanedText);
};

export async function getIndustryInsights(){

    //checking weather user is already logged in or not
    const {userId} = await auth();
    if (!userId) {
        throw new Error("User not logged in (Unauthorized)");
    }

    //checking if user is registered inside the database or not
    const user = await db.user.findUnique({
        //find the using clerk user Id
        where: {
            clerkUserId: userId,
        },
        include: {
            industryInsight: true, // Include the industryInsight relation
        },
    });
    if (!user) {
        throw new Error("User not found (Unregistered)");
    }

    //checking if industryinsights is already registered inside the database or not
    if (!user.industryInsight){
        //generate using AI
        const insights = await generateAIInsights(user.industry);
        //updating the user with the insights
        const industryInsight = await db.industryInsight.create({
            data: {
                industry: user.industry,
                ...insights,
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            }
        });

        return industryInsight;
    } 
    // if industryinsights is already registered inside the database
    return user.industryInsight;
}