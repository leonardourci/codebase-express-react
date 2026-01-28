import globalConfig from '../utils/global-config'
import { CustomError } from '../utils/errors'
import { EStatusCodes } from '../utils/status-codes'

export interface ISendVerificationEmailInput {
	to: string
	fullName: string
	verificationToken: string
}

export interface IResendEmailResponse {
	id: string
}

export async function sendVerificationEmail(input: ISendVerificationEmailInput): Promise<void> {
	const verificationUrl = `${globalConfig.appUrl}/verify-email?token=${input.verificationToken}`

	try {
		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${globalConfig.resendApiKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: globalConfig.resendFromEmail,
				to: input.to,
				subject: 'Verify your email address',
				html: `
					<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
						<h1 style="color: #333;">Welcome ${input.fullName}!</h1>
						<p style="color: #666; font-size: 16px;">Thank you for signing up. Please verify your email address to unlock all features.</p>
						<p style="margin: 30px 0;">
							<a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
								Verify Email Address
							</a>
						</p>
						<p style="color: #999; font-size: 14px;">This link expires in 30 minutes.</p>
						<p style="color: #999; font-size: 12px;">If you didn't sign up for this account, you can safely ignore this email.</p>
					</div>
				`
			})
		})

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({ message: 'Unknown error' }))
			throw new Error(`Resend API error: ${errorData.message || response.statusText}`)
		}
	} catch (error) {
		// Log error but don't throw - allows signup to proceed
		console.error('Failed to send verification email:', error)
		throw new CustomError('Failed to send verification email', EStatusCodes.INTERNAL_SERVER_ERROR)
	}
}
