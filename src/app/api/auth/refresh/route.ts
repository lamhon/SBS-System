import axios from "axios"
import Configs from "@/configs/configs"
import { cookies } from 'next/headers';
import { ResponseData } from "@/types/responseData"
import { EmpyObject } from "@/types/types"

export async function POST(request: Request) {
    const callApi = await axios.get(process.env.API_URL + 'auth/refresh', {
        headers: {
            Authorization: `Bearer ${cookies().get('refreshToken')?.value}`
        }
    })
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
    console.log('callApi:', callApi)

    if (callApi.status) {
        const expirationDate = new Date(callApi.data.expirationDate * 1000).toUTCString()
        const expirationDateRefresh = new Date(callApi.data.expirationDateRefresh * 1000).toUTCString()

        const headers = new Headers()
        headers.append('Set-Cookie', `accessToken=${callApi.data.accessToken}; path=/; expires=${expirationDate}; HttpOnly;`)
        headers.append('Set-Cookie', `refreshToken=${callApi.data.refreshToken}; path=/; expires=${expirationDateRefresh}; HttpOnly;`)

        return Response.json({
            status: true,
            message: `Xác thực thành công!`,
            data: {}
        }, {
            status: Configs.RETURN_CODE_SUCCESS,
            headers: headers
        })

    } else {
        return Response.json({
            status: false,
            message: `Xác thực thất bại!`,
            data: {}
        }, {
            status: Configs.RETURN_CODE_UNAUTHORIZED
        })
    }
}
