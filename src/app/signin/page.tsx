import type { Metadata } from "next"
import FormLogin from "./formLogin"
import "react-toastify/dist/ReactToastify.css"
import "./style.scss"


export const metadata: Metadata = {
  title: "Đăng nhập ‹ SBS System",
  description: "SBS System Website",
}

async function Login() {
  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-items-center s-login-bg">
        <div>
          <div className="h3 text-center pb-2">
            SBS System
          </div>
          <FormLogin />
        </div>
      </div>
    </>
  )
}

export default Login
