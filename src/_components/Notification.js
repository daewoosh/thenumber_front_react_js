import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

const initOptions = {
    autoClose: 4000,
    hideProgressBar: true,
    pauseOnHover: false,
    draggable: false,
    position: toast.POSITION.TOP_CENTER,
};

export const SuccessToast = (message, options = initOptions) => {
    toast.dismiss();
    toast.success(message, {
        position: options.position,
        autoClose: options.autoClose,
        hideProgressBar: options.hideProgressBar,
        pauseOnHover: options.pauseOnHover,
        draggable: options.draggable
    });
};

export const ErrorToast = (message, options = initOptions) => {
    toast.dismiss();
    toast.error(message, {
        position: options.position,
        autoClose: options.autoClose,
        hideProgressBar: options.hideProgressBar,
        pauseOnHover: options.pauseOnHover,
        draggable: options.draggable
    });
};

export const ErrorToastNoClose = (message, options = initOptions) => {
    toast.dismiss();
    toast.error(message, {
        position: options.position,
        autoClose: false,
        hideProgressBar: options.hideProgressBar,
        pauseOnHover: options.pauseOnHover,
        draggable: options.draggable
    });
};

export const WarningToast = (message, options = initOptions) => {
    toast.dismiss();
    toast.warning(message, {
        position: options.position,
        autoClose: options.autoClose,
        hideProgressBar: options.hideProgressBar,
        pauseOnHover: options.pauseOnHover,
        draggable: options.draggable
    });
};