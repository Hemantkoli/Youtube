import {
    HOME_VIDEOS_REQUEST,HOME_VIDEOS_SUCCESS,HOME_VIDEOS_FAIL,SELECTED_VIDEO_REQUEST,SELECTED_VIDEO_SUCCESS,
    SELECTED_VIDEO_FAIL,RELATED_VIDEO_REQUEST,RELATED_VIDEO_SUCCESS,RELATED_VIDEO_FAIL,SEARCHED_VIDEO_REQUEST,
    SEARCHED_VIDEO_SUCCESS,SEARCHED_VIDEO_FAIL,SUBSCRIPTIONS_CHANNEL_REQUEST,SUBSCRIPTIONS_CHANNEL_SUCCESS,
    SUBSCRIPTIONS_CHANNEL_FAIL,CHANNEL_VIDEOS_REQUEST,CHANNEL_VIDEOS_SUCCESS
} from '../actionType'
import request from '../../api'

export const getPopularVideos = ()=>async (dispatch,getState)=> {
    try {
        dispatch({
            type:HOME_VIDEOS_REQUEST,
        })
        const {data} = await request.get("/videos",{
            params:{
                part:"snippet,contentDetails,statistics",
                chart:"mostPopular",
                regionCode:"IN",
                maxResults:20,
                pageToken:getState().homeVideos.nextPageToken,
            },
        })

        dispatch({
            type:HOME_VIDEOS_SUCCESS,
            payload:{
                videos:data.items,
                nextPageToken:data.nextPageToken,
                category:'All',
            },
        })

    } catch (error) {
        console.log(error.message)
        dispatch({
            type:HOME_VIDEOS_FAIL,
            payload:error.message,
        })
    }
}

export const getVideosByCategory = (keyword)=>async (dispatch,getState)=> {
    try {
        dispatch({
            type:HOME_VIDEOS_REQUEST,
        })
        const {data} = await request.get("/search",{
            params:{
                part:"snippet",
                maxResults:20,
                pageToken:getState().homeVideos.nextPageToken,
                q:keyword,
                type:'video',
            },
        })

        dispatch({
            type:HOME_VIDEOS_SUCCESS,
            payload:{
                videos:data.items,
                nextPageToken:data.nextPageToken,
                category:keyword,
            },
        })

    } catch (error) {
        console.log(error.message)
        dispatch({
            type:HOME_VIDEOS_FAIL,
            payload:error.message,
        })
    }
}

export const getVideoById = (id)=>async dispatch=>{
    try {
        dispatch({
            type:SELECTED_VIDEO_REQUEST,
        })
        const {data} = await request('/videos',{
            params:{
                part:'snippet,statistics',
                id:id
            }
        })
        dispatch({
            type:SELECTED_VIDEO_SUCCESS,
            payload:data.items[0],
        })
    } catch (error) {
        console.log(error.message)
        dispatch({
            type:SELECTED_VIDEO_FAIL,
            payload:error.message,
        })
    }
}

export const getRelatedVideo = (id)=>async dispatch=>{
    try {
        dispatch({
            type:RELATED_VIDEO_REQUEST,
        })
        const {data} = await request('/search',{
            params:{
                part:'snippet',
                relatedToVideoId:id,
                maxResults:15,
                type:'video',
            }
        })
        dispatch({
            type:RELATED_VIDEO_SUCCESS,
            payload:data.items,
        })
    } catch (error) {
        console.log(error.response.data.message)
        dispatch({
            type:RELATED_VIDEO_FAIL,
            payload:error.response.data.message,
        })
    }
}

export const getVideosBySearch = (keyword)=>async (dispatch)=> {
    try {
        dispatch({
            type:SEARCHED_VIDEO_REQUEST,
        })
        const {data} = await request.get("/search",{
            params:{
                part:"snippet",
                maxResults:20,
                q:keyword,
                type:'video,channel',
            },
        })

        dispatch({
            type:SEARCHED_VIDEO_SUCCESS,
            payload:data.items,
        })

    } catch (error) {
        console.log(error.message)
        dispatch({
            type:SEARCHED_VIDEO_FAIL,
            payload:error.message,
        })
    }
}

export const getSubsciptionChannel = ()=>async (dispatch,getState)=>{
    try {
        dispatch({
            type:SUBSCRIPTIONS_CHANNEL_REQUEST,
        })
        const {data} = await request('/subscriptions',{
            params:{
                part:'snippet,contentDetails',
                mine:true,
            },
            headers:{
                Authorization:`Bearer ${getState().authReducer.accessToken}`,
            },
        })
        dispatch({
            type:SUBSCRIPTIONS_CHANNEL_SUCCESS,
            payload:data.items,
        })
    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type:SUBSCRIPTIONS_CHANNEL_FAIL,
            payload:error.response.data,
        })
    }
}

export const getVideosByChannel = (id)=>async (dispatch)=>{
    try {
        dispatch({
            type:CHANNEL_VIDEOS_REQUEST,
        })
        const {data:{items}} = await request('/channels',{
            params:{
                part:'contentDetails',
                id:id,
            },
        })

        const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads

        const {data} = await request('/playlistItems',{
            params:{
                part:'contentDetails,snippet',
                playlistId:uploadPlaylistId,
                maxResults:30,
            },
        })

        dispatch({
            type:CHANNEL_VIDEOS_SUCCESS,
            payload:data.items,
        })
    } catch (error) {
        console.log(error.response.data.message)
        dispatch({
            type:CHANNEL_VIDEOS_FAIL,
            payload:error.response.data,
        })
    }
}