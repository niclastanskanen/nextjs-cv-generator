'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

import PersonalInfoForm from './PersonalInfoForm'
import WorkExperienceForm from './WorkExperienceForm'
import EducationForm from './EducationForm'
import ProjectsForm from './ProjectsForm'
import TechnologiesForm from './TechnologiesForm'
import CvPreview from './CvPreview'

import { CvData, WorkExperienceOrProject } from '@/types/CvData'
import { generatePDF } from '@/lib/utils'

export default function CvTemplateGenerator() {
  const [cvData, setCvData] = useState<CvData>({
    fullName: '',
    location: '',
    email: '',
    linkedin: '',
    github: '',
    about: '',
    workExperience: [{ title: '', company: '', location: '', date: '', responsibilities: [''] }],
    education: [{ degree: '', institution: '', date: '' }],
    projects: [{ title: '', role: '', company: '', date: '', details: [''] }],
    technologies: ['']
  })
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [pdfFilename, setPdfFilename] = useState('')
  const [previewMode, setPreviewMode] = useState(false)

  const cvPreviewRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (
    field: keyof CvData,
    value: string,
    index?: number,
    subfield?: string,
    subIndex?: number
  ) => {
  setCvData(prevData => {
    if (field === 'technologies' && typeof index === 'number') {
      console.log('Updating technologies:', prevData.technologies);
      const newTechnologies = [...prevData.technologies];
      newTechnologies[index] = value;
      console.log('New technologies:', newTechnologies);
      return { ...prevData, technologies: newTechnologies };
    }

    if (Array.isArray(prevData[field]) && typeof index === 'number') {
      const newArray = [...(prevData[field] as Array<Record<string, unknown>>)];
      if (subfield && typeof subIndex === 'number') {
        newArray[index] = {
          ...newArray[index],
          [subfield]: (newArray[index][subfield] as string[]).map((item, i) =>
            i === subIndex ? value : item
          )
        };
      } else {
        newArray[index] = { ...newArray[index], [subfield as string]: value };
      }
      return { ...prevData, [field]: newArray };
    }
    return { ...prevData, [field]: value };
  });
};

  const addItem = (field: 'workExperience' | 'education' | 'projects' | 'technologies') => {
    setCvData(prevData => ({
      ...prevData,
      [field]: [
        ...prevData[field],
        field === 'technologies'
          ? ''
          : field === 'workExperience'
          ? { title: '', company: '', location: '', date: '', responsibilities: [''] }
          : field === 'education'
          ? { degree: '', institution: '', date: '' }
          : { title: '', role: '', company: '', date: '', details: [''] }
      ]
    }))
}

  const addBulletPoint = (index: number, field: 'workExperience' | 'projects', subfield: 'responsibilities' | 'details') => {
    setCvData(prevData => ({
      ...prevData,
      [field]: prevData[field].map((item, i) => 
        i === index ? { ...item, [subfield]: [...(item as WorkExperienceOrProject)[subfield] || [], ''] } : item
      )
    }))
  }

  const removeBulletPoint = (
    index: number, 
    subIndex: number, 
    field: 'workExperience' | 'projects' | 'technologies', 
    subfield?: 'responsibilities' | 'details'
  ) => {
    setCvData(prevData => ({
      ...prevData,
      [field]: field === 'technologies'
        ? prevData.technologies.filter((_, i) => i !== index)
        : prevData[field].map((item: WorkExperienceOrProject, i) => 
            i === index && subfield && item[subfield]
              ? { ...item, [subfield]: item[subfield]!.filter((_, j) => j !== subIndex) }
              : item
          )
    }))
  }

  const handleGeneratePDF = async () => {
    const element = cvPreviewRef.current
    if (!element) return

    setIsGeneratingPDF(true)

    try {
      const filename = pdfFilename || `${cvData.fullName.replace(/\s+/g, '_')}_CV.pdf`
      await generatePDF(element, filename)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('An error occurred while generating the PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      {/* Input Form */}
      <div className={`w-full md:w-1/2 space-y-4 ${previewMode ? 'hidden md:block' : ''}`}>
        <h2 className="text-2xl font-bold mb-4">CV Input</h2>
        <PersonalInfoForm cvData={cvData} handleInputChange={handleInputChange} />
        <WorkExperienceForm 
          workExperience={cvData.workExperience} 
          handleInputChange={handleInputChange} 
          addItem={addItem}
          addBulletPoint={addBulletPoint}
          removeBulletPoint={removeBulletPoint}
        />
        <EducationForm 
          education={cvData.education} 
          handleInputChange={handleInputChange} 
          addItem={addItem} 
        />
        <ProjectsForm 
          projects={cvData.projects} 
          handleInputChange={handleInputChange} 
          addItem={addItem}
          addBulletPoint={addBulletPoint}
          removeBulletPoint={removeBulletPoint}
        />
        <TechnologiesForm 
          technologies={cvData.technologies} 
          handleInputChange={handleInputChange} 
          addItem={addItem}
          removeBulletPoint={removeBulletPoint}
        />
      </div>

      {/* CV Preview */}
      <div className={`w-full ${previewMode ? 'md:w-full' : 'md:w-1/2'} bg-white p-8 rounded-lg shadow-lg`}>
        <CvPreview cvData={cvData} ref={cvPreviewRef} />
        <div className="mt-8 space-y-4">
          <div className="flex space-x-4">
            <Input
              placeholder="Custom filename (optional)"
              value={pdfFilename}
              onChange={(e) => setPdfFilename(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleGeneratePDF} disabled={isGeneratingPDF} className="w-40">
              {isGeneratingPDF ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
            </Button>
          </div>
          <Button onClick={() => setPreviewMode(!previewMode)} variant="outline" className="w-full">
            {previewMode ? 'Exit Preview' : 'Enter Preview Mode'}
          </Button>
        </div>
      </div>
    </div>
  )
}