import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CvData } from '@/types/CvData'

type PersonalInfoFormProps = {
  cvData: CvData;
  handleInputChange: (field: keyof CvData, value: string) => void;
};

export default function PersonalInfoForm({ cvData, handleInputChange }: PersonalInfoFormProps) {
  return (
    <>
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={cvData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          placeholder="Your full name"
        />
      </div>
      <div>
        <Label htmlFor="location">City, Country</Label>
        <Input
          id="location"
          value={cvData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          placeholder="E.g., New York, USA"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={cvData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Your professional email"
        />
      </div>
      <div>
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input
          id="linkedin"
          value={cvData.linkedin}
          onChange={(e) => handleInputChange('linkedin', e.target.value)}
          placeholder="LinkedIn profile URL"
        />
      </div>
      <div>
        <Label htmlFor="github">GitHub</Label>
        <Input
          id="github"
          value={cvData.github}
          onChange={(e) => handleInputChange('github', e.target.value)}
          placeholder="GitHub profile URL"
        />
      </div>
      <div>
        <Label htmlFor="about">Short Text About You</Label>
        <Textarea
          id="about"
          value={cvData.about}
          onChange={(e) => handleInputChange('about', e.target.value)}
          placeholder="Brief personal introduction"
        />
      </div>
    </>
  )
}