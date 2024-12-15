import { toast } from "react-toastify";

export const handleToast = (message: string, name: string) => {
  switch (name) {
    case "error":
      return toast.error(message, {
        position: "top-right",
      });
    case "success":
      return toast.success(message, {
        position: "top-right",
      });
  }
};
