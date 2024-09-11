import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { WorkExperienceOrProject } from '@/types/CvData'

type ProjectsFormProps = {
  projects: WorkExperienceOrProject[];
  handleInputChange: (field: 'projects', value: string, index: number, subfield?: string, subIndex?: number) => void;
  addItem: (field: 'projects') => void;
  addBulletPoint: (index: number, field: 'projects', subfield: 'details') => void;
  removeBulletPoint: (index: number, subIndex: number, field: 'projects', subfield: 'details') => void;
};

export default function ProjectsForm({
  projects,
  handleInputChange,
  addItem,
  addBulletPoint,
  removeBulletPoint
}: ProjectsFormProps) {
  return (
    <>
      {projects.map((project, index) => (
        <div key={index} className="space-y-2">
          <Label>Project {index + 1}</Label>
          <Input
            name="title"
            value={project.title}
            onChange={(e) => handleInputChange('projects', e.target.value, index, 'title')}
            placeholder="Project Title"
          />
          <Input
            name="role"
            value={project.role}
            onChange={(e) => handleInputChange('projects', e.target.value, index, 'role')}
            placeholder="Your Role"
          />
          <Input
            name="company"
            value={project.company}
            onChange={(e) => handleInputChange('projects', e.target.value, index, 'company')}
            placeholder="Company/Organization"
          />
          <Input
            name="date"
            value={project.date}
            onChange={(e) => handleInputChange('projects', e.target.value, index, 'date')}
            placeholder="Date Range"
          />
          {project.details?.map((detail, detailIndex) => (
            <div key={detailIndex} className="flex items-center space-x-2">
              <Input
                name="details"
                value={detail}
                onChange={(e) => handleInputChange('projects', e.target.value, index, 'details', detailIndex)}
                placeholder={`Project detail ${detailIndex + 1}`}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeBulletPoint(index, detailIndex, 'projects', 'details')}
                disabled={project.details?.length === 1}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove project detail</span>
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => addBulletPoint(index, 'projects', 'details')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project Detail
          </Button>
        </div>
      ))}
      <Button onClick={() => addItem('projects')} variant="outline" className="w-full">+ Add Project</Button>
    </>
  )
}