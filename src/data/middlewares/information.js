import {toast} from 'react-toastify';
import i18next from 'i18next'

const informationMiddleware = () => next => action =>{
    if (action.message && /(.*)(_SUCCESS)/.test(action.type)){
        toast.info(i18next.t(action.message), {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            button: false,
            progress: undefined,
        });
    }
    next(action);
};

export default informationMiddleware;