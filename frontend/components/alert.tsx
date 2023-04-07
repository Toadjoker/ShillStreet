import { notification } from "antd"

// type NotificationType = "success" | "info" | "warning" | "error"
export enum AlertType {
    success = "success",
    error = "error",
    info = "info",
}

const Alert = (type: AlertType, message: string) => {
    notification[type]({
        message: message,
        duration: 5,
    })
}

export default Alert
