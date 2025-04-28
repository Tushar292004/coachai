"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

//update user server action
export async function updateUser(data) {
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
        //three api calls to be made {time taking process} : do instead of using noraml api calls we can use Transaction to make it faster which comes from prisma

        // it will make sure all of these api calls are made and if any of them fails then it will rollback all the changes made by the transaction
        const result = await db.$transaction(
            async (tx) => {
            //find is the industry exists
                //let because value will be changed in future or overlapped
                let industryInsight = await tx.industryInsight.findUnique({
                    where: {
                        industry: data.industry,
                    },
                })

            //if industry not exists then create it with default values - can be updatrd in future
                //not exisitng using default values
                if (!industryInsight) {
                    industryInsight = await tx.industryInsight.create({
                        data: {
                            industry: data.industry,
                            salaryRanges: [], //Default empty array
                            growthRate: 0, //Default value
                            demandLevel: "MEDIUM", //Default value
                            topSkills: [], //Default empty array
                            marketOutLook: "NEUTRAL", //Default value
                            keyTrends: [], //Default empty array
                            recommendedSkills: [], //Default empty array
                            nextUpdate: new Date(Date.now() + 7 *24 *60 *1000), //1 week from now
                        },
                    });
                }

            //Updating the user
            const updatedUser = await tx.user.update({
                where: {
                   //finding from database not from clerk
                    id: user.id,
                },
                data: {
                    industry: data.industry,
                    experience: data.experience,
                    bio: data.bio,
                    skills: data.skills,
                },
            })

            return {updatedUser, industryInsight}

            }, {
            timeout: 10000, // 10 seconds 
            });

        return {success: true, ...result} ;

    } catch (error) {
        console.error("Error updating user and industry:", error.message);
        throw new Error("Failed to update user profile", error.message);
    }

}  

//Fetching onboarding status sercver action
export async function getUserOnboardingStatus() {
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
        //fetching the user data from the database
        const user  =  await db.user.findUnique({
            where: {
                clerkUserId: userId, // even we can use user.id but we are using clerkUserId to make it more readable
            },
            select: {
                industry: true,
            }
        })

        return { isOnboarded: !!user?.industry, //if industry exists then user is onboarded else not (true / false)
        }

     } catch (error) {
        console.error("Error checking onboarding status:", error.message);
        throw new Error("Failed to check onboarding status");
     }
}