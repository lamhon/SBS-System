import Configs from "@/configs/configs"
import { ResponseData } from "@/types/responseData"
import { EmpyObject } from "@/types/types"
import axios from "axios"

export async function POST(request: Request) {
    const data = await request.json()

    // Check length username
    if (data.username.length > Configs.USERNAME_MAX_LENGTH || data.username.length < Configs.USERNAME_MIN_LENGTH) {
        return Response.json({
            status: false,
            message: `Tên đăng nhập có độ dài không được bé hơn ${Configs.USERNAME_MIN_LENGTH} và lớn hơn ${Configs.USERNAME_MAX_LENGTH} ký tự!`,
            data: {},
        }, {
            status: Configs.RETURN_CODE_UNAUTHORIZED
        })
    }

    // Check username format
    const checkUsername = new RegExp(Configs.RGX_USERNAME_FORMAT).test(data.username)
    if (!checkUsername) {
        return Response.json({
            status: false,
            message: 'Tên đăng nhập chỉ bao gồm chữ cái alphabet và số!',
            data: {}
        }, {
            status: Configs.RETURN_CODE_UNAUTHORIZED
        })
    }

    // Check password format
    const checkPwd = new RegExp(Configs.RGX_PWD_FORMAT).test(data.pwd)
    if (!checkPwd) {
        return Response.json({
            status: false,
            message: `Mật khẩu phải bao gồm chữ hoa, chữ thường,số, ký tự đặc biệt và có độ dài từ ${Configs.PWD_MIN_LENGTH} đến ${Configs.PWD_MAX_LENGTH} ký tự!`,
            data: {}
        }, {
            status: Configs.RETURN_CODE_UNAUTHORIZED
        })
    }

    const callApi = await axios.post(process.env.API_URL + 'auth/signin', data)
        .then(response => {
            return new ResponseData<any>(true, response.data.data, response.data.message)
        })
        .catch(error => {
            if ('response' in error) {
                return new ResponseData<any>(false, {}, error.response.data.message)
            } else {
                return new ResponseData<EmpyObject>(false, {}, error.message)
            }
        })
    console.log(callApi)

    if (callApi.status) {
        const expirationDate = new Date(callApi.data.expirationDate * 1000).toUTCString()
        const expirationDateRefresh = new Date(callApi.data.expirationDateRefresh * 1000).toUTCString()

        const headers = new Headers()
        headers.append('Set-Cookie', `accessToken=${callApi.data.accessToken}; path=/; expires=${expirationDate}; HttpOnly;`)
        headers.append('Set-Cookie', `refreshToken=${callApi.data.refreshToken}; path=/; expires=${expirationDateRefresh}; HttpOnly;`)

        return Response.json({
            status: true,
            message: `Đăng nhập thành công!`,
            data: {}
        }, {
            status: Configs.RETURN_CODE_SUCCESS,
            headers: headers
        })
    } else {
        return Response.json({
            status: false,
            message: `Tên đăng nhập hoặc mật khẩu không hợp lệ!`,
            data: {}
        }, {
            status: Configs.RETURN_CODE_UNAUTHORIZED
        })
    }
}

export async function GET(request: Request) {
    const data = await request.json()

    console.log(data)

}
