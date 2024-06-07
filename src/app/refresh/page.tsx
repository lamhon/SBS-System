"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { showToast } from "@/common/common"
import Configs from "@/configs/configs"
import useFetch from "@/hooks/useFetch"

async function Refresh() {
  const router = useRouter()

  const { response, error, loading, fetchData } = useFetch()

  React.useEffect(() => {
    const callApi = async () => {
      await fetchData({
        url: '/api/auth/refresh',
        method: 'post',
        headers: JSON.stringify({ accept: '*/*' }),
      })
    }

    callApi()
  }, [])


  React.useEffect(() => {
    console.log(response)
    console.log(error)
    if (error) {
      showToast(
        error,
        Configs.TOAST_TYPE_ERROR
      )
    }

    if (response && response.status) {
      router.push('/dashboard')
    } else {
      router.push('/signin')

    }
  }, [response, error])

  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div>
          <div className="h3 text-center pb-2">
            Đang xác thực người dùng...
          </div>
        </div>
      </div>
    </>
  )
}

export default Refresh
