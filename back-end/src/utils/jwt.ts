import jwt from 'jsonwebtoken'

import {CustomError} from './errors'
import {EStatusCodes} from '../domain/statusCodes'
import {IPerformJsonCallback} from "../interfaces/expressAdapter";

const {JWT_SECRET} = process.env

interface IGenerateTokenPayload {
    userId: number
}

export const generateToken = (payload: IGenerateTokenPayload) => jwt.sign(payload, JWT_SECRET ?? '', {expiresIn: '1d'})

// @TODO remove the any from the response of this method
export const verifyToken = (payload: { authorization: string }): IPerformJsonCallback<any> => {
    if (!payload?.authorization) throw new CustomError('TOKEN_NOT_FOUND', EStatusCodes.UNAUTHORIZED)

    try {
        const token = payload.authorization.split('Bearer ')[1]

        jwt.verify(token, JWT_SECRET ?? '')

        return {
            response: {},
            status: EStatusCodes.OK
        }
    } catch (tokenErr) {
        throw new CustomError('TOKEN_ERROR', EStatusCodes.UNAUTHORIZED)
    }
}
