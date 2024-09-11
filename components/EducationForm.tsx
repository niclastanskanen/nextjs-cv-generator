import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type EducationFormProps = {
  education: { degree: string; institution: string; date: string }[];
  handleInputChange: (field: 'education', value: string, index: number, subfield: string) => void;
  addItem: (field: 'education') => void;
};

export default function EducationForm({ education, handleInputChange, addItem }: EducationFormProps) {
  return (
    <>
      {education.map((edu, index) => (
        <div key={index} className="space-y-2">
          <Label>Education {index + 1}</Label>
          <Input
            name="degree"
            value={edu.degree}
            onChange={(e) => handleInputChange('education', e.target.value, index, 'degree')}
            placeholder="Degree"
          />
          <Input
            name="institution"
            value={edu.institution}
            onChange={(e) => handleInputChange('education', e.target.value, index, 'institution')}
            placeholder="Institution"
          />
          <Input
            name="date"
            value={edu.date}
            onChange={(e) => handleInputChange('education', e.target.value, index, 'date')}
            placeholder="Date Range"
          />
        </div>
      ))}
      <Button onClick={() => addItem('education')} variant="outline" className="w-full">+ Add Education</Button>
    </>
  )
}