import React, { useState } from 'react';
import { Button } from "@/components/ui/button"; // shadcn button
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger, // Removed unused import
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"; // Utility for combining class names
import { FiLink, FiFolder } from 'react-icons/fi';

// Accept open state and setter function as props
const CustomizeProfileModal = ({ isOpen, onOpenChange }) => {

  // --- State for form inputs (example) ---
  // In a real app, this would likely come from user context or props
  const [nickname, setNickname] = useState("John");
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("");
  const [careerGoals, setCareerGoals] = useState("");
  const [studyHabits, setStudyHabits] = useState("");
  const [learningStyle, setLearningStyle] = useState("");
  const [interests, setInterests] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState(""); // State for LinkedIn
  // Add more state for other questions as needed

  const handleSave = () => {
    console.log("Saving profile:", { 
        nickname, major, year, careerGoals, studyHabits, learningStyle, interests, linkedInUrl 
    });
    // TODO: Add actual save logic (e.g., API call)
    onOpenChange(false); // Close the dialog on save
  };

  return (
    // Use the controlled version of Dialog
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {/* 
        DialogTrigger is usually used for uncontrolled dialogs.
        Since we control open state from Sidebar, we don't need a trigger here. 
      */}
      <DialogContent className="sm:max-w-[75vw] bg-light-surface dark:bg-dark-surface">
        <DialogHeader>
          <DialogTitle>Customize Profile</DialogTitle>
          <DialogDescription>
            Introduce yourself to get better, more personalized assistance.
          </DialogDescription>
        </DialogHeader>

        {/* Make content scrollable */}
        <ScrollArea className="max-h-[65vh] pr-6">
            {/* Use simple grid with gaps, labels above inputs */}
            <div className="grid gap-y-4 py-4">
              {/* --- Basic Info --- */}
              <h4 className="font-semibold text-lg border-b pb-2 mb-0">Basic Information</h4>
              <div className="grid gap-1.5">
                <Label htmlFor="nickname">Nickname</Label>
                <Input id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="What should MyCoach call you?" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="major">Major/Field</Label>
                <Input id="major" value={major} onChange={(e) => setMajor(e.target.value)} placeholder="e.g., Computer Science, Nursing, Undecided" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="year">Year</Label>
                <Input id="year" value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g., Freshman, Sophomore, Graduate Student" />
              </div>

              {/* --- Academic/Personal Info --- */}
              <h4 className="font-semibold text-lg border-b pb-2 mt-4 mb-0">Academic & Personal Details</h4>
              <div className="grid gap-1.5">
                <Label htmlFor="careerGoals">Career Goals</Label>
                <Textarea id="careerGoals" value={careerGoals} onChange={(e) => setCareerGoals(e.target.value)} placeholder="What are your aspirations after college?" className="min-h-[80px]" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="studyHabits">Study Habits</Label>
                <Textarea id="studyHabits" value={studyHabits} onChange={(e) => setStudyHabits(e.target.value)} placeholder="How do you typically study? (e.g., prefer groups, quiet spaces, specific times)" className="min-h-[80px]" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="learningStyle">Learning Style</Label>
                <Textarea id="learningStyle" value={learningStyle} onChange={(e) => setLearningStyle(e.target.value)} placeholder="How do you learn best? (e.g., visual aids, hands-on, lectures, reading)" className="min-h-[80px]" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="interests">Interests</Label>
                <Textarea id="interests" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="Any hobbies or subjects you're passionate about outside of your major?" className="min-h-[80px]" />
              </div>

              {/* --- External Links --- */}
              <h4 className="font-semibold text-lg border-b pb-2 mt-4 mb-0">External Links</h4>
              <div className="grid gap-1.5">
                <Label htmlFor="linkedin" className="flex items-center gap-2">
                   <FiLink className="text-gray-500 dark:text-gray-400" size={16}/>
                   LinkedIn Profile URL
                </Label>
                <Input
                  id="linkedin"
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div className="grid gap-1.5">
                 <Label>Link File Services</Label>
                 <div className="flex flex-wrap gap-3 items-center">
                   <Button variant="outline" size="sm" className="flex items-center gap-2">
                       <FiFolder size={16} className="text-gray-500 dark:text-gray-400"/>
                       Link Google Drive
                   </Button>
                   <Button variant="outline" size="sm" className="flex items-center gap-2">
                       <FiFolder size={16} className="text-gray-500 dark:text-gray-400"/>
                       Link Dropbox
                   </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                       <FiFolder size={16} className="text-gray-500 dark:text-gray-400"/>
                       Link OneDrive
                   </Button>
                 </div>
              </div>
            </div>
        </ScrollArea>
        
        <DialogFooter>
           {/* Use shadcn Button, apply variant="outline" for Cancel */}
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeProfileModal; 