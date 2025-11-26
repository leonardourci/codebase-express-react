import BaseController from './BaseController'
import {JoiValidationError} from '../utils/errors'
import AuthService from '../domain/services/Auth.service'
import {EStatusCodes} from '../domain/statusCodes'
import {ILoginPayload, ILoginResponse, ISignupPayload} from '../interfaces/auth'
import {IPerformJsonCallback} from "../interfaces/expressAdapter";
import {validateLoginPayload, validateSignupPayload} from "../utils/validations/auth.validator";

export default class AuthController extends BaseController {
    private authService = new AuthService(this.repository)

    login = async (payload: ILoginPayload): Promise<IPerformJsonCallback<ILoginResponse>> => {
        const {value, error} = validateLoginPayload(payload)

        if (error) throw new JoiValidationError(error)

        return {
            response: await this.authService.login(value),
            status: EStatusCodes.OK
        }
    }

    signup = async (payload: ISignupPayload): Promise<IPerformJsonCallback<any>> => {
        const {value, error} = validateSignupPayload(payload)

        if (error) throw new JoiValidationError(error)

        return {
            response: await this.authService.signup(value),
            status: EStatusCodes.OK
        }
    }
}
