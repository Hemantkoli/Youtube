import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './_loginScreen.scss'
import {login} from '../../redux/actions/auth.action'
import { useNavigate } from 'react-router';

const LoginScreen = () => {

  const dispatch = useDispatch()
  const accessToken = useSelector(state=>state.authReducer.accessToken)
//const accessToken = useSelector(state=>state.auth.accessToken)

  const handleLogin = () => {
    dispatch(login())
  }

  let navigate = useNavigate()

  useEffect(()=>{
    if(accessToken){
      navigate("/")
    }
  },[accessToken,navigate])

  return (
    <div className='login'>
        <div className='login__container'>
            <img src='http://pngimg.com/uploads/youtube/youtube_PNG2.png' alt=''/>
            <button onClick={handleLogin}>Login with Google</button>
            <p>this project is mern</p>
        </div>
    </div>
  )
}

export default LoginScreen