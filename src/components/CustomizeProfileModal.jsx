import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
// Removed unused FiLink, FiFolder
// Import active brand icons
import { SiLinkedin, SiDropbox } from 'react-icons/si';
import { FaGoogleDrive } from 'react-icons/fa';
import { ImOnedrive } from 'react-icons/im';

// Accept open state, setter function, and portalType as props
const CustomizeProfileModal = ({ isOpen, onOpenChange, portalType = 'student' }) => {

  // --- State for form inputs ---
  // Common state
  const [nickname, setNickname] = useState("John/Jane"); // Default based on portal?
  const [linkedInUrl, setLinkedInUrl] = useState("");

  // Student-specific state
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("");
  const [careerGoals, setCareerGoals] = useState("");
  const [studyHabits, setStudyHabits] = useState("");
  const [learningStyle, setLearningStyle] = useState("");
  const [interests, setInterests] = useState("");

  // Staff-specific state
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [manager, setManager] = useState("");
  const [passionInRole, setPassionInRole] = useState("");
  const [aiAssistanceNeeds, setAiAssistanceNeeds] = useState("");
  
  // Add more state for other questions as needed

  const handleSave = () => {
    let profileData = {};
    if (portalType === 'student') {
        profileData = { nickname, major, year, careerGoals, studyHabits, learningStyle, interests, linkedInUrl };
    } else { // staff
        profileData = { nickname, role, department, manager, passionInRole, aiAssistanceNeeds, linkedInUrl };
    }
    console.log(`Saving ${portalType} profile:`, profileData);
    // TODO: Add actual save logic (e.g., API call)
    onOpenChange(false); // Close the dialog on save
  };

  // Updated focus style: remove border/ring, add opaque glow
  const inputFocusStyle = "focus:outline-none focus:border-transparent focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-[inset_0_0_1px_2px_#FACC15] transition-shadow duration-150";

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
              {/* --- Render fields based on portalType --- */}
              
              {/* === Student Fields === */} 
              {portalType === 'student' && (
                <>
                  <h4 className="font-semibold text-lg border-b pb-2 mb-0">Basic Information</h4>
                  <div className="grid gap-1.5">
                    <Label htmlFor="nickname">Nickname</Label>
                    <Input id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="What should MyCoach call you?" className={cn(inputFocusStyle)} />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="major">Major/Field</Label>
                    <Input id="major" value={major} onChange={(e) => setMajor(e.target.value)} placeholder="e.g., Computer Science, Nursing, Undecided" className={cn(inputFocusStyle)} />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g., Freshman, Sophomore, Graduate Student" className={cn(inputFocusStyle)} />
                  </div>

                  <h4 className="font-semibold text-lg border-b pb-2 mt-4 mb-0">Academic & Personal Details</h4>
                  <div className="grid gap-1.5">
                    <Label htmlFor="careerGoals">Career Goals</Label>
                    <Textarea id="careerGoals" value={careerGoals} onChange={(e) => setCareerGoals(e.target.value)} placeholder="What are your aspirations after college?" className={cn("min-h-[80px]", inputFocusStyle)} />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="studyHabits">Study Habits</Label>
                    <Textarea id="studyHabits" value={studyHabits} onChange={(e) => setStudyHabits(e.target.value)} placeholder="How do you typically study?" className={cn("min-h-[80px]", inputFocusStyle)} />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="learningStyle">Learning Style</Label>
                    <Textarea id="learningStyle" value={learningStyle} onChange={(e) => setLearningStyle(e.target.value)} placeholder="How do you learn best?" className={cn("min-h-[80px]", inputFocusStyle)} />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="interests">Interests</Label>
                    <Textarea id="interests" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="Any hobbies or subjects you're passionate about?" className={cn("min-h-[80px]", inputFocusStyle)} />
                  </div>
                </>
              )}

              {/* === Staff Fields === */} 
              {portalType === 'staff' && (
                <>
                  <h4 className="font-semibold text-lg border-b pb-2 mb-0">Basic Information</h4>
                  <div className="grid gap-1.5">
                    <Label htmlFor="nickname">Nickname</Label>
                    <Input id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="What should MyCoach call you?" className={cn(inputFocusStyle)} />
                  </div>
                   <div className="grid gap-1.5">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g., Academic Advisor, Admissions Officer" className={cn(inputFocusStyle)} />
                  </div>
                   <div className="grid gap-1.5">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g., Advising Center, Admissions" className={cn(inputFocusStyle)} />
                  </div>
                   <div className="grid gap-1.5">
                    <Label htmlFor="manager">Manager (Optional)</Label>
                    <Input id="manager" value={manager} onChange={(e) => setManager(e.target.value)} placeholder="Who do you report to?" className={cn(inputFocusStyle)} />
                  </div>

                  <h4 className="font-semibold text-lg border-b pb-2 mt-4 mb-0">Role Details & AI Needs</h4>
                  <div className="grid gap-1.5">
                    <Label htmlFor="passion">Passion in Role</Label>
                    <Textarea id="passion" value={passionInRole} onChange={(e) => setPassionInRole(e.target.value)} placeholder="What aspects of your job are you most passionate about?" className={cn("min-h-[80px]", inputFocusStyle)} />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="aiNeeds">AI Assistance Needs</Label>
                    <Textarea id="aiNeeds" value={aiAssistanceNeeds} onChange={(e) => setAiAssistanceNeeds(e.target.value)} placeholder="How do you envision AI helping you most effectively in your daily tasks?" className={cn("min-h-[80px]", inputFocusStyle)} />
                  </div>
                </>
              )}

              {/* --- External Links --- */}
              <h4 className="font-semibold text-lg border-b pb-2 mt-4 mb-0">External Links</h4>
              <div className="grid gap-1.5">
                <Label htmlFor="linkedin" className="flex items-center gap-2">
                   <SiLinkedin className="text-gray-500 dark:text-gray-400" size={20}/>
                   LinkedIn Profile URL
                </Label>
                <Input
                  id="linkedin"
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className={cn(inputFocusStyle)}
                />
              </div>
              <div className="grid gap-1.5">
                 <Label>Link File Services</Label>
                 <div className="flex flex-wrap gap-3 items-center">
                   <Button variant="outline" size="sm" className="flex items-center gap-2">
                       <FaGoogleDrive size={20} className="text-gray-500 dark:text-gray-400"/>
                       Link Google Drive
                   </Button>
                   <Button variant="outline" size="sm" className="flex items-center gap-2">
                       <SiDropbox size={20} className="text-gray-500 dark:text-gray-400"/>
                       Link Dropbox
                   </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                       <ImOnedrive size={20} className="text-gray-500 dark:text-gray-400"/>
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