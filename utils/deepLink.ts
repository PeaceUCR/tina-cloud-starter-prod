import {isServer} from "../utils/firebase";

export const deepLinkRedirect = (link, redirect) => {
    if (!isServer && window.innerWidth > 600 && redirect) {
        return window.location.href = redirect;
    }
    window.location.href = link;
    setTimeout(function () {
        if (redirect) {
            window.location.href = redirect;
        }
    }, 100);
}

export const deepLinkAction = (link, action, failedAction) => {
    if (!isServer && window.innerWidth > 600) {
        return action();
    }
    window.location.href = link;
    setTimeout(function () {
        failedAction();
    }, 1000);
}