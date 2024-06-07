const Configs = {
    TOAST_POSITION_TOP_LEFT: "top-left",
    TOAST_POSITION_TOP_RIGHT: "top-right",
    TOAST_POSITION_TOP_CENTER: "top-center",
    TOAST_POSITION_BOTTOM_LEFT: "bottom-left",
    TOAST_POSITION_BOTTOM_RIGHT: "bottom-right",
    TOAST_POSITION_BOTTOM_CENTER: "bottom-center",

    TOAST_TYPE_INFO: "info",
    TOAST_TYPE_SUCCESS: "success",
    TOAST_TYPE_WARNING: "warn",
    TOAST_TYPE_ERROR: "error",

    TOAST_THEME_LIGHT: "light",
    TOAST_THEME_DARK: "dark",
    TOAST_THEME_COLORED: "colored",

    TOAST_HIDE_PROGRESS_BAR: true,
    TOAST_NOT_HIDE_PROGRESS_BAR: false,

    TOAST_LIMIT_DEFAULT: 1,
    TOAST_CLOSE_ON_CLICK_DEFAULT: true,
    TOAST_PAUSE_ON_FOCUS_LOSS_DEFAULT: true,
    TOAST_DRAGGABLE_DEFAULT: true,
    TOAST_NEWEST_ON_TOP_DEFAULT: false,
    TOAST_PAUSE_ON_HOVER_DEFAULT: true,
    TOAST_RTL_DEFAULT: false,
    TOAST_AUTO_CLOSE_DEFAULT: 5000,
    // -----------------------------
    RGX_USERNAME_FORMAT: /^[a-zA-Z0-9]+$/,
    RGX_PWD_FORMAT: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9^$*.\[\]{}()?\-\"!@#%&\/\\,><':;|_~`+]{8,120}$/,
    // -----------------------------
    RETURN_CODE_BAD_RQ: 400,
    RETURN_CODE_UNAUTHORIZED: 401,
    RETURN_CODE_EXTERNAL_ERROR: 500,
    RETURN_CODE_SUCCESS: 200,
    // -----------------------------
    STT_ACTIVE: "00",
    STT_DELETED: "01",
    // -----------------------------
    USERNAME_MAX_LENGTH: 60,
    USERNAME_MIN_LENGTH: 4,
    PWD_MAX_LENGTH: 120,
    PWD_MIN_LENGTH: 8,
    FULLNAME_MAX_LENGTH: 120,
    FULLNAME_MIN_LENGTH: 2,
    // -----------------------------
    MSG_UNKNOWN_ERROR: "Lỗi không xác định!",
    MSG_WRONG_USERNAME: "Tên đăng nhập không không chính xác!",
    MSG_WRONG_PWD: "Mật khẩu không chính xác!",
}

Object.freeze(Configs)

export default Configs
