import axios from "axios";
import cookie from "react-cookies";
import { Cookies, useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";


export const signInApi = async (data: any) => {
    const response = await axios.post("http://localhost:4000/api/auth/signIn", data).catch((error) => null);
    if(!response) return null;
   
    const token = response.data.data['token']

    const expires = new Date();
    const exprTime = response.data.data['exprTime'];
   
    expires.setMilliseconds(expires.getMilliseconds() + exprTime);
    const cookies = new Cookies();

    cookies.set('token', token, { expires }); 

    const result = token.sub;
    //나중에 수정
    return result 
}

export const signUpApi = async (data: any) => {
    const response = await axios.post("http://localhost:4000/api/auth/signUp", data).catch((error) => null);
    if(!response) return null;

    const result = response.data;
    return result 
}

export const writeApi = async (data: any) => {
  
  
    const response = await instance.post("/api/board/write", data,{withCredentials: true},
    //const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];  쿠키를 클라이언트에서 다루는것은 별로 안좋다
    //const headers: { Authorization?: string } = {};                                                  애초에 쿠키는 위험  
    // {headers: {                                                                                     interceptor 에서 useCookie 사용하였으나 Hook걸려서(?) 실패
    //     'Authorization': `Bearer ${token}`                                                          그나마 괜춘은 방법은 react-cookies사용이란다. 사실 여기부턴 영역밖.
    //   }}
    //                          사실 제일 좋은 방법은: 쿠키를 스프링에 날려서 그걸 헤더로 인식하게 하는것! 다른 구현 마치면 꼭 시도해 볼것!
      ).catch((error) => null);
  
    if(!response) return null;

    const result = response.data;
    return result 
}

const baseURL= "http://localhost:4000"
const instance = axios.create({
    baseURL, //기본  루트 url
    timeout: 20000,
 
});
instance.interceptors.request.use((config) => {             //하나하나 헤더 넣어주면 간지가 없음
    const token = cookie.load("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

instance.interceptors.response.use((config) => {    //config => axios request/뭐든 하기 전에 실행됨 여기서 이 친구는 헤더 로깅인포등을 바꿔줄수있...?70% 확신 
    const token=cookie.load("token");
    if(token){
    config.headers.Authorization = `Bearer ${token}`;
}   return config;
});
  export default instance;