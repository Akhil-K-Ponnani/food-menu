import React, { createContext, useContext, useEffect, useState } from "react"

const Auth = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [selectedFood, setSelectedFood] = useState()
    const [fetchFoods, setFetchFoods] = useState(false)
    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("user"))
        setUser(userInfo)
    }, [])
    return (
        <Auth.Provider value={{ user, setUser, selectedFood, setSelectedFood, fetchFoods, setFetchFoods }}>{children}</Auth.Provider>
    )
}

export const AuthContext = () => {
    return useContext(Auth)
}

export default AuthProvider;