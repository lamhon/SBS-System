import { toast } from "react-toastify"
import Configs from "@/configs/configs"

export function showToast(
    content: string,
    type: string,
    position: string = Configs.TOAST_POSITION_TOP_RIGHT,
    theme: string = Configs.TOAST_THEME_LIGHT,
    autoClose: Number | boolean = Configs.TOAST_AUTO_CLOSE_DEFAULT,
    hideProgressBar: boolean = Configs.TOAST_HIDE_PROGRESS_BAR,
    limit: Number = Configs.TOAST_LIMIT_DEFAULT,
    closeOnClick: boolean = Configs.TOAST_CLOSE_ON_CLICK_DEFAULT,
    pauseOnFocusLoss: boolean = Configs.TOAST_PAUSE_ON_FOCUS_LOSS_DEFAULT,
    draggable: boolean = Configs.TOAST_DRAGGABLE_DEFAULT,
    newestOnTop: boolean = Configs.TOAST_NEWEST_ON_TOP_DEFAULT,
    pauseOnHover: boolean = Configs.TOAST_PAUSE_ON_HOVER_DEFAULT,
    rtl: boolean = Configs.TOAST_RTL_DEFAULT, // right to left layout
) {
    const objSetting: { [key: string]: any } = {}

    objSetting.position = position
    objSetting.autoClose = autoClose
    objSetting.theme = theme
    objSetting.hideProgressBar = hideProgressBar
    if (autoClose === false) {
        delete objSetting.hideProgressBar
    }
    objSetting.newestOnTop = newestOnTop
    objSetting.closeOnClick = closeOnClick
    objSetting.rtl = rtl
    objSetting.pauseOnFocusLoss = pauseOnFocusLoss
    objSetting.draggable = draggable
    objSetting.pauseOnHover = pauseOnHover
    objSetting.limit = limit

    switch (type) {
        case Configs.TOAST_TYPE_INFO:
            return toast.info(content, objSetting)
        case Configs.TOAST_TYPE_SUCCESS:
            return toast.success(content, objSetting)
        case Configs.TOAST_TYPE_WARNING:
            return toast.warn(content, objSetting)
        case Configs.TOAST_TYPE_ERROR:
            return toast.error(content, objSetting)
        default:
            return toast(content, objSetting)
    }
}