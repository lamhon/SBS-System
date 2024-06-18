"use client"

import * as React from "react"
import Link from "next/link"

import Configs from "@/configs/configs"
import "./style.scss"
import { showToast } from "@/common/common"
import { useRouter } from "next/navigation"
import { Spin } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-regular-svg-icons"
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons"
import useFetch from "@/hooks/useFetch"


function FormLogin() {
  const router = useRouter()

  const [disabledLogin, setDisabledLogin] = React.useState<boolean>(true)
  const [usernameFail, setUsernameFail] = React.useState<string>('')
  const [pwdFail, setPwdFail] = React.useState<string>('')
  const [hidePwd, setHidePwd] = React.useState<boolean>(false)

  const username = React.useRef<string>('')
  const pwd = React.useRef<string>('')

  const { response, error, loading, fetchData } = useFetch()

  React.useEffect(() => {
    // console.log(response)
    // console.log(error)
    if (error) {
      showToast(
        error,
        Configs.TOAST_TYPE_ERROR
      )
    }

    if (response && response.status) {
      router.push('/dashboard')
    }
  }, [response, error])

  const handleHideShowPwd = (e: React.SyntheticEvent) => {
    e.preventDefault()

    setHidePwd(!hidePwd)
  }

  const handleChange = (formType: number, value: string) => {
    if (formType === 1) {
      setUsernameFail('')
      username.current = value
    } else {
      setPwdFail('')
      pwd.current = value
    }

    if (username.current.length > Configs.USERNAME_MAX_LENGTH ||
      username.current.length < Configs.USERNAME_MIN_LENGTH) {
      setDisabledLogin(true)
    } else if (pwd.current.length > Configs.PWD_MAX_LENGTH ||
      pwd.current.length < Configs.PWD_MIN_LENGTH) {
      setDisabledLogin(true)
    } else {
      setDisabledLogin(false)
    }
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      if (username.current.length < Configs.USERNAME_MIN_LENGTH ||
        username.current.length > Configs.USERNAME_MAX_LENGTH ||
        !new RegExp(Configs.RGX_USERNAME_FORMAT).test(username.current)) {
        setUsernameFail('s-input-wrong')
        showToast(
          Configs.MSG_WRONG_USERNAME,
          Configs.TOAST_TYPE_WARNING
        )
        return
      }

      if (pwd.current.length < Configs.PWD_MIN_LENGTH ||
        pwd.current.length > Configs.PWD_MAX_LENGTH ||
        !new RegExp(Configs.RGX_PWD_FORMAT).test(pwd.current)
      ) {
        setPwdFail('s-input-wrong')
        showToast(
          Configs.MSG_WRONG_PWD,
          Configs.TOAST_TYPE_WARNING
        )
        return
      }

      await fetchData({
        url: '/api/auth/signin',
        method: 'post',
        headers: JSON.stringify({ accept: '*/*' }),
        body: JSON.stringify({
          username: username.current,
          pwd: pwd.current
        }),
      })
    } catch (err) {
      console.error(err)
      showToast(
        Configs.MSG_UNKNOWN_ERROR,
        Configs.TOAST_TYPE_ERROR
      )
    }
  }
  return (
    <Spin spinning={loading}>
      <div className="s-form-login">
        <form
          onSubmit={e => handleSubmit(e)}
        >
          <div className="mb-2">
            <label className="s-label-input col-12" htmlFor="username">Tên đăng nhập</label>
            <input
              id="username"
              className={`s-input col-12 ${usernameFail}`}
              autoFocus
              onChange={(e) => handleChange(1, e.target.value)}
              required
            />
          </div>
          <div>
            <label className="s-label-input col-12" htmlFor="pwd">Mật khẩu</label>
            <div style={{
              position: 'relative'
            }}>
              <input
                id="pwd"
                className={`s-input s-input-pwd col-12 ${pwdFail}`}
                type={hidePwd ? "text" : "password"}
                onChange={(e) => handleChange(2, e.target.value)}
                required
              />
              <a className="s-hide-btn-pwd" onClick={handleHideShowPwd}>
                <FontAwesomeIcon icon={hidePwd ? faEyeSlash : faEye} />
              </a>
            </div>
          </div>
          <div className="forgetmenot">
            <input type="checkbox" id="rememberme" />
            <label className="s-label-input" htmlFor="rememberme">Ghi nhớ đăng nhập</label>
          </div>
          <div className="pt-2 text-center">
            <button
              className="s-login-btn"
              type="submit"
              disabled={(disabledLogin || loading) ? true : false}
              style={disabledLogin ? { cursor: 'no-drop' } : {}}>
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
      <div className="s-login-nav pt-3 text-center">
        <Link href="/register">Đăng ký</Link>
        <span> | </span>
        <Link href="/lostpassword">Quên mật khẩu?</Link>
      </div>
    </Spin>
  )
}

export default FormLogin
