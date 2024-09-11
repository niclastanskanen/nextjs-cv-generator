import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { WorkExperienceOrProject } from '@/types/CvData'

type WorkExperienceFormProps = {
  workExperience: WorkExperienceOrProject[];
  handleInputChange: (field: 'workExperience', value: string, index: number, subfield?: string, subIndex?: number) => void;
  addItem: (field: 'workExperience') => void;
  addBulletPoint: (index: number, field: 'workExperience', subfield: 'responsibilities') => void;
  removeBulletPoint: (index: number, subIndex: number, field: 'workExperience', subfield: 'responsibilities') => void;
};

export default function WorkExperienceForm({
  workExperience,
  handleInputChange,
  addItem,
  addBulletPoint,
  removeBulletPoint
}: WorkExperienceFormProps) {
  return (
    <>
      {workExperience.map((exp, index) => (
        <div key={index} className="space-y-2">
          <Label>Work Experience {index + 1}</Label>
          <Input
            name="title"
            value={exp.title}
            onChange={(e) => handleInputChange('workExperience', e.target.value, index, 'title')}
            placeholder="Job Title"
          />
          <Input
            name="company"
            value={exp.company}
            onChange={(e) => handleInputChange('workExperience', e.target.value, index, 'company')}
            placeholder="Company"
          />
          <Input
            name="location"
            value={exp.location}
            onChange={(e) => handleInputChange('workExperience', e.target.value, index, 'location')}
            placeholder="Location"
          />
          <Input
            name="date"
            value={exp.date}
            onChange={(e) => handleInputChange('workExperience', e.target.value, index, 'date')}
            placeholder="Date Range"
          />
          <Label>Responsibilities and Achievements</Label>
          {exp.responsibilities?.map((resp, respIndex) => (
            <div key={respIndex} className="flex items-center space-x-2">
              <Input
                name="responsibilities"
                value={resp}
                onChange={(e) => handleInputChange('workExperience', e.target.value, index, 'responsibilities', respIndex)}
                placeholder={`Responsibility ${respIndex + 1}`}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeBulletPoint(index, respIndex, 'workExperience', 'responsibilities')}
                disabled={exp.responsibilities?.length === 1}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove responsibility</span>
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => addBulletPoint(index, 'workExperience', 'responsibilities')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Responsibility
          </Button>
        </div>
      ))}
      <Button onClick={() => addItem('workExperience')} variant="outline" className="w-full">+ Add Work Experience</Button>
    </>
  )
}