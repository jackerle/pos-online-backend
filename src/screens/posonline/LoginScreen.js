import React, { useState } from 'react'
import APPBar from '../../components/posonline/AppBar_tool'
import LoginDialog from '../../components/posonline/LoginDialog';



export default function LoginScreen({
    user_list, setIsLogin, setUserInfo
}) {

    const [loginOpen, setLoginOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState(false)

    const handleClickLoginOpen = () => {
        setLoginOpen(true);
    };

    const handleLoginClose = () => {
        setLoginOpen(false);
    };

    const handleUsername = (event)=>{
        setUsername(event.target.value)
    }

    const handlePassword = (event)=>{
        setPassword(event.target.value)
    }

    const login = (event) => {
        event.preventDefault()

        //handle login
        let userInfo = user_list.find((user) => user.username === username && password === password)
        if (!userInfo) {
            setShowError(true)
            handleLoginClose()
            return
        }
        setUserInfo(userInfo)
        setIsLogin(true)

        handleLoginClose()
    }

    return (
        <>

            <APPBar isLogin={false} handleClickLoginOpen={handleClickLoginOpen} />
            <LoginDialog 
                loginOpen={loginOpen} 
                handleLoginClose={handleLoginClose} 
                login={login}
                username={username}
                password={password}
                handleUsername={handleUsername}
                handlePassword={handlePassword}
                showError={showError}
                setShowError={setShowError} />
        </>
    )
}