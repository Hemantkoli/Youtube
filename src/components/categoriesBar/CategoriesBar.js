import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action'
import './_categoriesBar.scss'


const keywords = [
  "All",
  "React.js",
  "3111111111111",
  "4111111111111",
  "5111111111111",
  "6111111111111",
  "7111111111111",
  "1111111111118",
  "9111111111111",
  "9111111111111",
  "9111111111111",
  "9111111111111",
]

const CategoriesBar = () => {

  const [activeElement,setActiveElement] = useState('All')

  const dispatch = useDispatch()

  const handleClick = (value) => {
    setActiveElement(value)
    if(value === 'All'){
      dispatch(getPopularVideos())
    } else {
      dispatch(getVideosByCategory(value))
    }
  }

  return (
    <div className='categoriesBar'>
      {
        keywords.map((value,i)=><span key={i} onClick={()=>handleClick(value)} 
        className={activeElement===value?"active":""}>{value}</span>)
      }
    </div>
  )
}

export default CategoriesBar