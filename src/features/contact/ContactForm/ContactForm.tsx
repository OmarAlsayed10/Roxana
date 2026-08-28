import { useState, type FormEvent } from 'react'
import type { Language } from '../../../content'
import { sendEnquiry } from '../../../shared/services'
import { Button } from '../../../UI'
import { formCopy, formFields } from './constant'
import { ContactFormTokens } from './tokens'

type FormState = 'idle' | 'sending' | 'sent' | 'not-configured' | 'failed'

export const ContactForm = ({ language }: { language: Language }) => {
  const [state, setState] = useState<FormState>('idle')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setState('sending')
    try {
      const result = await sendEnquiry({
        name: String(data.get('name') ?? ''),
        phone: String(data.get('phone') ?? ''),
        message: String(data.get('message') ?? '')
      })
      setState(result === 'sent' ? 'sent' : 'not-configured')
    } catch {
      setState('failed')
    }
  }

  return (
    <form onSubmit={submit} {...ContactFormTokens.root}>
      {formFields.map((field) => (
        <label key={field.name} {...ContactFormTokens.field}>
          <span {...ContactFormTokens.label}>{field.label[language]}</span>
          {field.type === 'textarea' ? (
            <textarea name={field.name} required={field.required} {...ContactFormTokens.textarea} />
          ) : (
            <input name={field.name} type={field.type} required={field.required} {...ContactFormTokens.input} />
          )}
        </label>
      ))}
      <div>
        <Button type="submit">{state === 'sending' ? formCopy.sending[language] : formCopy.submit[language]}</Button>
      </div>
      {state === 'sent' && <p {...ContactFormTokens.status}>{formCopy.sent[language]}</p>}
      {state === 'not-configured' && <p {...ContactFormTokens.status}>{formCopy.notConfigured[language]}</p>}
      {state === 'failed' && <p {...ContactFormTokens.status}>{formCopy.failed[language]}</p>}
    </form>
  )
}
