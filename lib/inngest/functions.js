import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../prisma";
import { inngest } from "./client";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel(
    {
        model: "gemini-1.5-flash",
    }
)

export const generateIndustryInsights = inngest.createFunction(
  // name of the function
  { name: "Generate Industry Insights" },
  // it means that this function will be triggered by a cron job
  // by predefined interval in this case 7 days
  { cron: "0 0 * * 0" }, //go to claude and ask their support for the cron job format
  async ({ step }) => {
    // fetching all the industries from the database
    const industries = await step.run("Fetch Industries", async () => {
      return await db.industryInsight.findMany({
        select: { industry: true },
      })
    });

    for (const { industry } of industries) {
      // using inngest function to make api calls

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
          Include at least 5 skills and trends.`;

      // step.ai.wrap is inngest function :  these give additional info about api to monitor
      const res = await step.ai.wrap("gemini", async (p) => {
        return await model.generateContent(p)
      }, prompt)

      const text = res.response.candidates[0].content.parts[0].text || ""
      // Clean the text by removing any markdown formatting or code block markers
      const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

      const insights = JSON.parse(cleanedText);

      //updating the database
      await step.run(`Update ${industry} insights`, async () => {
        await db.industryInsight.update({
          where: { industry },
          data: {
            ...insights,
            lastUpdated: new Date(),
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days later
          }
        })
      })
    }


  }

)