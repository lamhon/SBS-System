import * as React from "react"
import axios, { AxiosError, AxiosResponse } from "axios"

axios.defaults.baseURL = 'http://sbs.com:3000'

interface AxiosOptions {
    url: string
    method: 'get' | 'post' | 'put' | 'delete'
    body?: any
    headers?: any
}

function useFetch() {
    const [response, setResponse] = React.useState<any>(null)
    const [error, setError] = React.useState<string>('')
    const [loading, setLoading] = React.useState<boolean>(false)

    const fetchData = async ({ url, method, body = null, headers = null }: AxiosOptions) => {
        setLoading(true)
        setError('')
        axios.request({
            url,
            method,
            data: body,
            headers: headers ? JSON.parse(headers) : undefined
        })
            .then((res: AxiosResponse) => {
                console.log(res)
                setResponse(res.data)
            })
            .catch((err: AxiosError<any>) => {
                console.log(err)
                setError(err.response?.data.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return { response, error, loading, fetchData }
}

export default useFetch
