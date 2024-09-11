import React from 'react'
import { CvData } from '@/types/CvData'

type CvPreviewProps = {
  cvData: CvData;
};

const CvPreview = React.forwardRef<HTMLDivElement, CvPreviewProps>(({ cvData }, ref) => {
  return (
    <div ref={ref} className="space-y-2">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">{cvData.fullName || 'Your Name'}</h1>
        <div className="w-full flex justify-between items-start">
          <div>
            <p className="text-gray-600">{cvData.location || 'City, Country'}</p>
            <p className="text-gray-600">{cvData.email || 'email@example.com'}</p>
          </div>
          <div className="text-right">
            <a href={cvData.linkedin} className="text-blue-500 block">{cvData.linkedin ? 'LinkedIn' : 'linkedin.com/in/your_profile'}</a>
            <a href={cvData.github} className="text-blue-500 block">{cvData.github ? 'GitHub' : 'github.com/your_profile'}</a>
          </div>
        </div>
      </div>

      <p className="text-gray-700">{cvData.about || "I'm a [Your Profession] who [Your Key Skill/Achievement]."}</p>

      <h2 className="text-lg font-semibold text-blue-600 border-b border-blue-600">Work Experience</h2>
      {cvData.workExperience.map((exp, index) => (
        <div key={index} className="mb-2">
          <div className="flex justify-between">
            <h3 className="font-semibold">{exp.title || 'Job Title'}</h3>
            <p>{exp.date || 'Date Range'}</p>
          </div>
          <p>{exp.company || 'Company'}, {exp.location || 'Location'}</p>
          <ul className="list-disc list-inside">
            {exp.responsibilities?.map((resp, respIndex) => (
              <li key={respIndex}>{resp || `Responsibility ${respIndex + 1}`}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2 className="text-lg font-semibold text-blue-600 border-b border-blue-600">Education and Certifications</h2>
      {cvData.education.map((edu, index) => (
        <div key={index} className="mb-2">
          <div className="flex justify-between">
            <p><span className="font-semibold">{edu.degree || 'Degree'}</span>, {edu.institution || 'Institution'}</p>
            <p>{edu.date || 'Graduation Year'}</p>
          </div>
        </div>
      ))}

      <h2 className="text-lg font-semibold text-blue-600 border-b border-blue-600">Projects</h2>
      {cvData.projects.map((project, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between">
            <h3 className="font-semibold">{project.title || 'Project Title'}</h3>
            <p>{project.date || 'Date Range'}</p>
          </div>
          <p>{project.role || 'Your Role'} - {project.company || 'Company/Organization'}</p>
          <ul className="list-disc list-inside">
            {project.details?.map((detail, detailIndex) => (
              <li key={detailIndex}>{detail || `Project detail ${detailIndex + 1}`}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2 className="text-lg font-semibold text-blue-600 border-b border-blue-600">Technologies and Languages</h2>
      <p>{cvData.technologies.join(', ') || 'List of relevant tools, programming languages, and frameworks'}</p>
    </div>
  )
})

CvPreview.displayName = 'CvPreview'

export default CvPreview