import type { Metadata } from 'next'
import CVPageClient from '@/components/cv/CVPageClient'

export const metadata: Metadata = {
  title: 'CV · Sebastian Pestana',
  description: 'Curriculum Vitae — Ingénieur Full Stack & DevOps',
}

export default function CVPage() {
  return <CVPageClient />
}
