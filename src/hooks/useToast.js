import { toast } from "react-toastify";

const useToast = () => {
  function showToast(type, message) {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      type: `${type}`,
    });
  }

  return [{ showToast }];
};

export default useToast;
