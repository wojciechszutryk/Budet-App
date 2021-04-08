import {toast} from "react-toastify";
import i18next from "i18next";

export const setCurrency = (money) => {
    return new Intl.NumberFormat('pl',{style: 'currency', currency: 'PLN'}).format(Number(money))
}

export const setDate = (date) => {
    if(!date) return new Intl.DateTimeFormat('pl').format(new Date(Date.now()))
    return new Intl.DateTimeFormat('pl').format(new Date(date))
}

export const colorChange = (color, percent) => {
    let R = parseInt(color.substring(1,3),16);
    let G = parseInt(color.substring(3,5),16);
    let B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (percent + 100) / 100);
    G = parseInt(G * (percent + 100) / 100);
    B = parseInt(B * (percent + 100) / 100);

    R = (R<255)?R:255;
    G = (G<255)?G:255;
    B = (B<255)?B:255;

    const RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
    const GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
    const BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

export const informationNotification = (message) =>{
    toast.info(i18next.t(message), {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        button: false,
        progress: undefined,
    });
};