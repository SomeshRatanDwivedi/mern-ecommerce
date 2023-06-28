import { LOCAL_STORAGE_TOKEN_KEY_NAME } from "./api";

const localStorageKey=LOCAL_STORAGE_TOKEN_KEY_NAME;

const makeConfig = (isMultiPart) => {
    const token = window.localStorage.getItem(localStorageKey);

    const headers = {
        'Content-Type': isMultiPart ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
    }
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    const config = {
        headers: {
            ...headers
        },
    }
    return config;

}



export default makeConfig;