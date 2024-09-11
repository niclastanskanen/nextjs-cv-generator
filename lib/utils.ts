import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import html2pdf from 'html2pdf.js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generatePDF = async (element: HTMLElement, filename: string) => {
  if (!element) return

  try {
    // Apply PDF-specific styles
    const headings = element.querySelectorAll('h2')
    headings.forEach((heading: HTMLElement) => {
      heading.style.fontSize = '18px'
      heading.style.fontWeight = '600'
      heading.style.color = '#2563eb'
      heading.style.borderBottom = '1px solid #2563eb'
      heading.style.paddingBottom = '5px'
      heading.style.marginBottom = '10px'
    })

    const name = element.querySelector('h1')
    if (name) {
      name.style.fontSize = '24px'
      name.style.fontWeight = '700'
      name.style.marginBottom = '16px'
    }

    const links = element.querySelectorAll('a')
    links.forEach((link: HTMLElement) => {
      link.style.color = '#3b82f6'
      link.style.textDecoration = 'none'
    })

    // Add bullet points
    const listItems = element.querySelectorAll('li')
    listItems.forEach((item: HTMLElement) => {
      item.style.position = 'relative'
      item.style.paddingLeft = '15px'
      item.style.marginBottom = '5px'
      if (item.textContent !== null) {
        item.textContent = `• ${item.textContent}`
      }
    })

    // Add padding to the bottom of the content
    element.style.paddingBottom = '50px'

    const opt = {
      margin: [10, 10, 20, 10], // top, right, bottom, left
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    
    await html2pdf().set(opt).from(element).save()

    // Revert styles after PDF generation
    headings.forEach((heading: HTMLElement) => {
      heading.style.fontSize = ''
      heading.style.fontWeight = ''
      heading.style.color = ''
      heading.style.borderBottom = ''
      heading.style.paddingBottom = ''
      heading.style.marginBottom = ''
    })

    if (name) {
      name.style.fontSize = ''
      name.style.fontWeight = ''
      name.style.marginBottom = ''
    }

    links.forEach((link: HTMLElement) => {
      link.style.color = ''
      link.style.textDecoration = ''
    })

    // Revert bullet points
    listItems.forEach((item: HTMLElement) => {
      item.style.position = ''
      item.style.paddingLeft = ''
      item.style.marginBottom = ''
      if (item.textContent !== null) {
        item.textContent = item.textContent.replace('• ', '')
      }
    })

    // Remove added padding
    element.style.paddingBottom = ''
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw new Error('An error occurred while generating the PDF. Please try again.')
  }
}