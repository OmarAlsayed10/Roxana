export type Enquiry = {
  name: string
  phone: string
  message: string
}

export type EnquiryResult = 'sent' | 'not-configured'

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

export const sendEnquiry = async (enquiry: Enquiry): Promise<EnquiryResult> => {
  if (!endpoint) return 'not-configured'
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(enquiry)
  })
  if (!response.ok) throw new Error(`sendEnquiry failed: ${response.status}`)
  return 'sent'
}
