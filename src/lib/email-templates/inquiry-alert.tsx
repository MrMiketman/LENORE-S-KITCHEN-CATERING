import React from 'react'
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  form?: string
  rows?: { label: string; value: string }[]
}

const InquiryAlert = ({ form = 'Website', rows = [] }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New {form} inquiry from your website</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>Lenore's Kitchen Catering</Text>
        <Heading style={h1}>New {form} inquiry</Heading>
        <Hr style={hr} />
        {rows.map((r) => (
          <Section key={r.label} style={{ marginBottom: '14px' }}>
            <Text style={label}>{r.label}</Text>
            <Text style={value}>{r.value || '—'}</Text>
          </Section>
        ))}
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: InquiryAlert,
  subject: (d: Record<string, any>) => `New ${d['form'] ?? 'website'} inquiry`,
  displayName: 'New inquiry alert',
  previewData: { form: 'Contact', rows: [{ label: 'Name', value: 'Jane Doe' }, { label: 'Message', value: 'Hello!' }] },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', color: '#20201D' }
const container = { padding: '28px 25px' }
const eyebrow = { fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#B89A63', margin: 0 }
const h1 = { fontFamily: 'Georgia, serif', fontSize: '24px', margin: '8px 0 0' }
const hr = { borderColor: '#D8CBB9', margin: '20px 0' }
const label = { fontSize: '11px', textTransform: 'uppercase' as const, letterSpacing: '1px', color: '#7a746a', margin: 0 }
const value = { fontSize: '15px', margin: '4px 0 0', whiteSpace: 'pre-wrap' as const }
