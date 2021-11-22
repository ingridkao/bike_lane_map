import axios from 'axios'
import jsSHA from 'jssha'

const GetAuthorizationHeader = () => {
    const AppID = 'fe8a15a3865248428e81f3357ca752f9'
    const AppKey = '-KKFfJvNKRJrNP85dJXH0IoadNg'

    const GMTString = new Date().toGMTString();
    const ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    const HMAC = ShaObj.getHMAC('B64');
    const Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

    return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/}; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}

const init = 'https://ptx.transportdata.tw/MOTC'

export const GetTdxData = (inputUrl, params={}) => {
    const paramsObj = {
        format: 'JSON',
        ...params
    }
    if(params && params.$filter){
        paramsObj['$orderby'] = 'SrcUpdateTime'
    }
    const searchParams = new URLSearchParams(paramsObj)
    const fetchurl = (inputUrl)? inputUrl: '/v2/Rail/TRA/Station'
    return axios.get(`${init}${fetchurl}?${searchParams.toString()}`,{
        headers: GetAuthorizationHeader()
    })
    .then((response) => {
        return response.data
    })
    .catch(error => {
        return error
    })
}

export const TaiwanCityList = {
    Taipei: "臺北市",
    NewTaipei: "新北市",
    Taoyuan: "桃園市",
    Taichung: "臺中市",
    Tainan: "臺南市",
    Kaohsiung: "高雄市",
    Keelung: "基隆市",
    Hsinchu: "新竹市",
    HsinchuCounty: "新竹縣",
    MiaoliCounty: "苗栗縣",
    ChanghuaCounty: "彰化縣",
    NantouCounty: "南投縣",
    YunlinCounty: "雲林縣",
    ChiayiCounty: "嘉義縣",
    Chiayi: "嘉義市",
    PingtungCounty: "屏東縣",
    YilanCounty: "宜蘭縣",
    HualienCounty: "花蓮縣",
    TaitungCounty: "臺東縣",
    KinmenCounty: "金門縣",
    PenghuCounty: "澎湖縣",
    LienchiangCounty: "連江縣",
}

export const TaiwanCityLocation = {
    NewTaipei: { latitude: 24.91571, longitude: 121.6739 },
    Kaohsiung: { latitude: 23.01087, longitude: 120.666 },
    Taichung: { latitude: 24.23321, longitude: 120.9417 },
    Taipei:{ latitude: 25.09108, longitude: 121.5598 },
    Taoyuan:{ latitude: 24.93759, longitude: 121.2168 },
    Tainan:{ latitude: 23.1417, longitude: 120.2513 },
    ChanghuaCounty:{ latitude: 23.99297, longitude: 120.4818 },
    PingtungCounty:{ latitude: 22.54951, longitude: 120.62 },
    YunlinCounty:{ longitude:120.3897,latitude: 23.75585 },
    MiaoliCounty: {longitude:120.9417,latitude: 24.48927},
    ChiayiCounty: {longitude:120.574,latitude: 23.45889},
    Chiayi: {longitude:120.4473,latitude: 23.47545},
    Hsinchu: { longitude:120.9647,latitude: 24.80395 },
    HsinchuCounty: {longitude:121.1252,latitude: 24.70328},
    NantouCounty: { longitude:120.9876,latitude: 23.83876 },
    YilanCounty: { longitude:121.7195,latitude: 24.69295 },
    Keelung: { longitude:121.7081,latitude: 25.10898 },
    HualienCounty: { longitude:121.3542,latitude: 23.7569 },
    TaitungCounty: { longitude:120.9876,latitude: 22.98461 },
    KinmenCounty: { longitude:118.3186,latitude: 24.43679 },
    PenghuCounty: {longitude:119.6151,latitude: 23.56548},
    LienchiangCounty: {longitude:119.5397,latitude: 26.19737}

}

export const apiType = [
    {
        index: 'ScenicSpot',
        title: '熱門景點',
        name: '景點',
        url: '/v2/Tourism/ScenicSpot'
    },
    {
        index: 'Activity',
        title: '觀光活動',
        name: '活動',
        url: '/v2/Tourism/Activity'
    },
    {
        index: 'Restaurant',
        title: '美食品嚐',
        name: '餐飲',
        url: '/v2/Tourism/Restaurant'
    },
    {
        index: 'Hotel',
        title: '住宿推薦',
        name: '住宿',
        url: '/v2/Tourism/Hotel'
    }
]