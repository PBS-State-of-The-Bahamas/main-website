import { toast } from "react-toastify";

type ToastType = "success" | "error" | "info" | "warning";

const sendToast = (message: string, type: ToastType) => {
  return toast[type](message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    
  });
};

export default sendToast;