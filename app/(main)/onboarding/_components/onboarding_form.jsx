'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { onboardingSchema } from '@/app/lib/schema'
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
import { NeonGradientCard } from '@/components/magicui/neon-gradient-card'
import useFetch from '@/hooks/use-fetch'
import { updateUser } from '@/action/user'
import { Loader2 } from 'lucide-react'
//shadcn imports 
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import { motion, useScroll, useSpring } from "framer-motion";



//  here on boarding component is taking industries as props and we are using it in the component
const OnboardingForm = ({ industries }) => {

  const [selectedIndustry, setSelectedIndustry] = useState(null)
  const router = useRouter(); // useRouter is used to navigate to different pages in the app

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser)

  //register : 
  const { register, handleSubmit, formState: { errors, }, setValue, watch, } = useForm({
    resolver: zodResolver(onboardingSchema) //zodResolver is used to validate the form data using zod schema
  })

  // handleSubmit is used to handle the form submission
  const onSubmit = async (value) => {
    updateUserFn
    try {
      console.log(value);
      const formattedIndustry = `${value.industry} - ${value.subIndustry.toLowerCase().replace(/ /g, "-")}`; // format the industry and sub-industry

      await updateUserFn({
        ...value,
        industry: formattedIndustry,
      })
    } catch (error) {
       console.log("Onboarding error: ", error);
    }
   };

   useEffect(()=> {
      if (updateResult?.success && !updateLoading){
        toast.success(`Profile completed successfully`, { autoClose: 3000, });
        router.push("/dashboard"); // redirect to dashboard after successful profile completion
        router.refresh(); // refresh the page to get the updated data
      }
   }, [updateLoading, updateResult])

  const watchIndustry = watch("industry"); // watch is used to get the value of the industry field

  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false }}
    transition={{ duration: 0.8 }}
   className="flex bg-background justify-center items-center">

      <NeonGradientCard className="p-0  max-w-lg md:max-w-2xl my-10 mx-4 w-full ">
        {/* <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} /> */}
          <CardHeader className=" bg-[#171717] flex flex-col items-start justify-start p-4">
            <CardTitle className="gradient-title text-4xl" >Complete Your Profile</CardTitle>
            <CardDescription className="text-md">
              Choose your industry to get personalized carrer insights and recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 bg-[#171717]">
            <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
              <div className='flex gap-4 justify-start'>
                {/* Industries */}
                <div className="space-y-2">
                  <Label htmlFor="industry" className="mx-1 text-md">Industry</Label>
                  <Select className=""
                    onValueChange={(value) => {
                      setValue("industry", value);
                      setSelectedIndustry(
                        industries.find((industry) => industry.id === value)
                      );
                      setValue("subIndustry", ""); // Reset sub-industry when industry changes
                    }}>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80 overflow-y-auto">
                      {industries.map((industry) => {
                        return <SelectItem value={industry.id} key={industry.id}>{industry.name} </SelectItem>
                      })}
                    </SelectContent>
                  </Select>
                  {errors.industry && <p className="text-red-500 text-sm">{errors.industry.message}</p>}
                </div>

                {/* only after industryb is selected subindustry will be visible */}
                {watchIndustry &&
                  //  SubIndustry 
                  <div className="space-y-2">
                    <Label htmlFor="subIndustry" className="mx-1 text-md">Specialization</Label>
                    <Select className=""
                      onValueChange={(value) => {
                        setValue("subIndustry", value);
                      }}>
                      <SelectTrigger id="subIndustry">
                        <SelectValue placeholder="Select an industry" />
                      </SelectTrigger>
                      <SelectContent className="max-h-80 overflow-y-auto">
                        {selectedIndustry?.subIndustries.map((industry) => {
                          return <SelectItem value={industry} key={industry}>{industry} </SelectItem>
                        })}
                      </SelectContent>
                    </Select>
                    {errors.subIndustry && <p className="text-red-500 text-sm">{errors.subIndustry.message}</p>}
                  </div>
                }
              </div>


              {/* experience */}
              <div className="space-y-2">
                <Label htmlFor="experience" className="mx-1 text-md">Years of Experience</Label>
                <Input id="experience"
                  type="number" min="0" max="50"
                  placeholder=" Enter years of experience"
                  {...register("experience")}
                />


                {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
              </div>

              {/* skills */}
              <div className="space-y-2">
                <Label htmlFor="experience" className="mx-1 text-md">Skills</Label>
                <Input id="skills" 
                  placeholder="e.g., Python, Javascrip, UI/UX"
                  {...register("skills")}
                />
                <p className='text-sm text-muted-foreground'>
                    Separate multiple skills with commas
                </p>


                {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
              </div>

              {/* Professional Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="mx-1 text-md">Professional Bio</Label>
                <Textarea id="bio"
                  className={"h-32"}
                  placeholder="Tell us about your professional background... "
                  {...register("bio")}
                />

                {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
              </div>

              {/* submit button */}
              <Button variant="" type="submit" className="w-full" disabled={updateLoading}>
                {updateLoading ? (
                  <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Saving...
                  </>
                ): ("Complete Profile")}
              </Button>

            </form>
          </CardContent>
      </NeonGradientCard>
    </motion.div>
  )

  
}

export default OnboardingForm
