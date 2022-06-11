import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal.'
import { getSubsciptionChannel } from '../../redux/actions/videos.action'
import './subscriptions.scss'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const SubscriptionsScreen = () => {

const dispatch = useDispatch()

useEffect(()=>{
    dispatch(getSubsciptionChannel())
},[dispatch])
    
const {videos,loading} = useSelector(state=>state.subsciptionsChannel)
  return (
      <Container fluid>
          {
              !loading ? videos?.map(video=><VideoHorizontal video={video} key={video.id} subScreen/>):(
            <SkeletonTheme color="#343a40" highlightColor='#3c4147'>
                <Skeleton width="100%" height="160px" count={20}/>
            </SkeletonTheme>)  
          }
      </Container>
  )
}

export default SubscriptionsScreen