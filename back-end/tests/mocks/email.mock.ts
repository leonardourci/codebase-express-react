export const mockSendVerificationEmail = jest.fn().mockResolvedValue(undefined)
export const mockSendPasswordResetEmail = jest.fn().mockResolvedValue(undefined)

export const setupEmailMocks = () => {
    mockSendVerificationEmail.mockResolvedValue(undefined)
    mockSendPasswordResetEmail.mockResolvedValue(undefined)
}

export const resetEmailMocks = () => {
    mockSendVerificationEmail.mockClear()
    mockSendPasswordResetEmail.mockClear()
}
