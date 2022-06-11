import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import HomeScreen from './screens/homeScreen/HomeScreen'
import LoginScreen from './screens/loginScreen/LoginScreen'
import './_app.scss'
import { Navigate , Route , Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import WatchScreen from './screens/watchScreen/WatchScreen'
import SearchScreen from './screens/SearchScreen'
import SubscriptionsScreen from './screens/subscriptionsScreen/SubscriptionsScreen'
import ChannelScreen from './screens/channelScreen/ChannelScreen'

const Layout = ({children}) => {

  const [sidebar , toggleSidebar] = useState(false);
  const handleToggleSidebar = () => toggleSidebar(value=>!value)

  return (
     <>
        <Header handleToggleSidebar={handleToggleSidebar}/>
        <div className='app__container'>
            <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar}/>
            <Container fluid className='app__main'>
              {children}
            </Container>
        </div>
    </>
  )
}

const App = () => {

  const {accessToken,loading} = useSelector(state=>state.authReducer)
  let navigate = useNavigate()
  useEffect(()=>{
    if(!loading && !accessToken){
      navigate("/auth")
    }
  },[accessToken,loading, navigate])

  return (
    <Routes>
      <Route exact path='/' element={<Layout><HomeScreen/></Layout>}/>
      <Route exact path='/auth' element={<LoginScreen/>}/>
      <Route exact path='/search/:query' element={<Layout><SearchScreen/></Layout>}/>
      <Route exact path='/watch/:id' element={<Layout><WatchScreen/></Layout>}/>
      <Route exact path='/feed/subscriptions' element={<Layout><SubscriptionsScreen/></Layout>}/>
      <Route exact path='/channel/:channelId' element={<Layout><ChannelScreen/></Layout>}/>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App