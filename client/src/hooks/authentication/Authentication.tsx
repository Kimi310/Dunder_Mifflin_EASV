import { Api, LoginCustomerDto, CreateCustomerDto, UpdateCustomerDto, CustomerDto } from "@Api";
import { useEffect, useState } from "react";
import { Signal } from "@preact/signals-react";

const localUser = window.localStorage.getItem("user")
const userSignal = new Signal<CustomerDto | undefined>(localUser ? JSON.parse(localUser) : undefined)
const loggedIn = new Signal<boolean>(!!localUser);

export const useSignup = (data: CreateCustomerDto) => {
    const API = new Api();

    return API.SignUp(data).then((res) => {
        if (res.data || loggedIn.value === true) {
            window.localStorage.removeItem("user")
            loggedIn.value = false
            userSignal.value = undefined
        }
        
        window.localStorage.setItem("user", JSON.stringify(res.data))
        userSignal.value = res.data
        loggedIn.value = true

        window.location.href = '/';

        return res.data
    })
};

export const useLogin = (data: LoginCustomerDto) => {
    const API = new Api();

    return API.Login(data).then((res) => {
        if (res.data || loggedIn.value === true) {
            window.localStorage.removeItem("user")
            loggedIn.value = false
            userSignal.value = undefined
        }
        
        window.localStorage.setItem("user", JSON.stringify(res.data))
        userSignal.value = res.data
        loggedIn.value = true

        window.location.href = '/';
    })
};


export const useUpdaueCustomer = (data: UpdateCustomerDto) => {
    const API = new Api();

    return API.UpdateCustomer(data).then((res) => {
        if (res.data || loggedIn.value === true) {
            window.localStorage.removeItem("user")
            userSignal.value = undefined
        }
        
        window.localStorage.setItem("user", JSON.stringify(res.data))
        userSignal.value = res.data
        loggedIn.value = true
    })
};


export const useLogout = () => {
    window.localStorage.removeItem("user")
    loggedIn.value = false
    userSignal.value = undefined

    window.location.href = '/';
}


export const useAuth = () => {
    const [user, setUser] = useState(userSignal.value);
    const [isLoggedIn, setIsLoggedIn] = useState(loggedIn.value);

    useEffect(() => {
        const userUnsub = userSignal.subscribe((value) => setUser(value));
        const loggedInUnsub = loggedIn.subscribe((value) => setIsLoggedIn(value));

        return () => {
            userUnsub();
            loggedInUnsub();
        };
    }, []);

    return { user, isLoggedIn };
};