import { notification } from "antd"

export enum AlertType {
    success = "success",
    error = "error",
    info = "info",
}

const Alert = (type: AlertType, message: string, description?: string) => {
    notification[type]({
        message: message,
        description: description,
        duration: 10,
    })
}

export default Alert
