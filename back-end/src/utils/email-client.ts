import globalConfig from './global-config'

export interface ISendEmailInput {
	to: string
	subject: string
	html: string
}

export interface ISendEmailResponse {
	id: string
}

export async function sendEmail(input: ISendEmailInput): Promise<ISendEmailResponse> {
	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${globalConfig.resendApiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from: globalConfig.resendFromEmail,
			to: input.to,
			subject: input.subject,
			html: input.html
		})
	})

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({ message: 'Unknown error' }))
		throw new Error(`Resend API error: ${errorData.message || response.statusText}`)
	}

	return response.json()
}
