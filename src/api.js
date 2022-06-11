import axios from 'axios'

const request = axios.create({
    baseURL:"https://youtube.googleapis.com/youtube/v3/",
    params:{
        key:"AIzaSyDKLRFyOUnvLWQEY0DXmxcHeSxu0bMgNsM",
    },
})

export default request


//key:"AIzaSyAhs_06w-T1ADGGY90hEzydfbbehAQr1-8",
