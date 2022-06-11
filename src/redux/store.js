import { createStore , applyMiddleware , combineReducers } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {authReducer} from './reducers/auth.reducer'
import {homeVideosReducer,selectedVideoReducer, relatedVideoReducer,searchedVideosReducer,subsciptionsChannelReducer,channelVideosReducer} from './reducers/videos.reducer'
import {channelDetailsReducer} from './reducers/channel.reducer'
import {commentListReducer} from './reducers/comments.reducer'


const rootReducer = combineReducers({
    authReducer,
    homeVideos:homeVideosReducer,
    selectedVideo:selectedVideoReducer,
    channelDetails:channelDetailsReducer,
    commentList:commentListReducer,
    relatedVideo:relatedVideoReducer,
    searchedVideos:searchedVideosReducer,
    subsciptionsChannel:subsciptionsChannelReducer,
    channelVideos:channelVideosReducer,
})
const store = createStore(rootReducer,{},composeWithDevTools(applyMiddleware(thunk)))

export default store