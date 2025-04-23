import BlurCircleAnimation from "@/components/animation/blurCircleAnimation"
import Footer from "@/components/global/footer"
import RecruiterNav from "@/components/page-section/recruiter/recruiterNav"
import type { Metadata } from "next"
import type { PropsWithChildren } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

export const metadata: Metadata = {
  title: "mocha - Recruiter",
  description: "mocha - job portal for recruiter",
}

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-secondary text-background w-full h-screen overflow-hidden relative p-1">
      <div className="bg-primary-background flex flex-col justify-between overflow-hidden w-full h-full rounded-xl relative z-10">
        <RecruiterNav />
        <ScrollArea className="h-[calc(100vh-4rem)] w-full   ">
          <div className="flex flex-col justify-between min-h-[calc(100vh-4rem)]">
            {children}
            <Footer />
          </div>
        </ScrollArea>
      </div>
      <BlurCircleAnimation />
    </div>
  )
}

export default layout
