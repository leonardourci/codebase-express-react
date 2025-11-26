import {Request, Response} from 'express'
import {IPerformJsonCallback} from '../interfaces/expressAdapter'
import {EStatusCodes} from '../domain/statusCodes'
import {JoiValidationError} from '../utils/errors'

type TPerformJsonCallback = (payload: any) => Promise<IPerformJsonCallback<any>> | IPerformJsonCallback<any>

export class ExpressAdapter {
    static performJson =
        (fn: TPerformJsonCallback) =>
            async (req: Request, res: Response): Promise<Response<any> | void> => {
                try {
                    const callbackResponse = await fn({...req.query, ...req.body, ...req.params})

                    res.status(callbackResponse.status).json(callbackResponse.response)
                } catch (err: any) {
                    /**
                     * The errors must always follow the array pattern
                     *
                     * Example: { errors: [ error1, error2 ] }
                     */

                    if (err instanceof JoiValidationError) {
                        return res.status(err.statusCode).json({errors: err.messages})
                    }

                    res.status(err?.statusCode ?? EStatusCodes.INTERNAL).json({
                        errors: [err.message]
                    })
                }
            }
}
