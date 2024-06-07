import { NextRequest, NextResponse } from "next/server"
import Configs from "@/configs/configs"
import httpProxy from "http-proxy"

export async function POST(req: NextRequest) {
    try {
        const {
            username,
            pwd,
            fullName,
            sex,
            phoneNumber,
            identifiNumber,
            email,
            birthday,
            address
        } = await req.json()

        // Check length username
        if (username.length > Configs.USERNAME_MAX_LENGTH || username.length < Configs.USERNAME_MIN_LENGTH) {
            return new NextResponse(
                `Tên đăng nhập có độ dài không được bé hơn ${Configs.USERNAME_MIN_LENGTH} và lớn hơn ${Configs.USERNAME_MAX_LENGTH} ký tự!`,
                {
                    status: Configs.RETURN_CODE_BAD_RQ
                }
            )
        }

        // Check username format
        const checkUsername = new RegExp(Configs.RGX_USERNAME_FORMAT).test(username)
        if (!checkUsername) {
            return new NextResponse(
                "Tên đăng nhập chỉ bao gồm chữ cái alphabet và số!",
                {
                    status: Configs.RETURN_CODE_BAD_RQ
                }
            )
        }

        // Check password format
        const checkPwd = new RegExp(Configs.RGX_PWD_FORMAT).test(pwd)
        if (!checkPwd) {
            return new NextResponse(
                `Mật khẩu phải bao gồm chữ hoa, chữ thường,số, ký tự đặc biệt và có độ dài từ ${Configs.PWD_MIN_LENGTH} đến ${Configs.PWD_MAX_LENGTH} ký tự!`,
                {
                    status: Configs.RETURN_CODE_BAD_RQ
                }
            )
        }

        // Check length fullName
        if (fullName.length < Configs.FULLNAME_MIN_LENGTH || fullName.length > Configs.FULLNAME_MAX_LENGTH) {
            return new NextResponse(
                `Tên phải có độ dài từ ${Configs.FULLNAME_MIN_LENGTH} đến ${Configs.FULLNAME_MAX_LENGTH} ký tự!`,
                {
                    status: Configs.RETURN_CODE_BAD_RQ
                }
            )
        }
    } catch (err) {
        return new NextResponse(
            "Lỗi không xác định",
            {
                status: Configs.RETURN_CODE_EXTERNAL_ERROR
            }
        )
    }
}