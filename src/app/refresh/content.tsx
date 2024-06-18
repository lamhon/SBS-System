"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { showToast } from "@/common/common"
import Configs from "@/configs/configs"
import useFetch from "@/hooks/useFetch"

function Content({ origin }: { origin: string }) {
  const router = useRouter()
  console.log('origin:', origin)
  const { response, error, loading, fetchData } = useFetch()

  React.useEffect(() => {
    const callApi = async () => {
      console.log('call api')
      await fetchData({
        url: '/api/auth/refresh',
        method: 'post',
        headers: JSON.stringify({ accept: '*/*' }),
      })
    }

    callApi()
  }, [])

  React.useEffect(() => {
    console.log('==========================')
    console.log('responseRefreshPage:', response)
    console.log('errorRefreshPage:', error)
    if (error) {
      console.log('go to error')
      showToast(
        error,
        Configs.TOAST_TYPE_ERROR
      )
      router.push('/signin')
    }
    console.log('go to common')

    if (response) {
      if (response.status) {
        router.push(`/${origin}`)
      } else {
        console.log('CSR: chui vo day r')
        router.push('/signin')
      }
    }
  }, [response, error])

  return (
    <div className="h3 text-center pb-2">
      Đang xác thực người dùng...
    </div>
  )
}

export default Content
