import { z } from "zod";

export const onboardingSchema = z.object(
    {
        industry: z.string({
            required_error: "Please select and industry",
        }),
    
        subIndustry: z.string({
            required_error: "Please select a specialization",
        }),
    
        bio: z.string().max(500).optional(), //500limit optional
    
        experience: z.string()
            .transform((value) => parseInt(value, 10)) //convert to number
            .pipe(z.number()  
                .min(0, "Experience must be a at least 0 years")
                .max(50, "Experience cannot exceed 50 years")), // here we set limits for the value
        
        // input will be comma separated string and we will convert it to array of strings and filter out empty values
        skills: z.string().transform((val) => 
            val ? val.split(",").map((skill) => skill.trim()).filter(Boolean) : undefined
        )
    }
)