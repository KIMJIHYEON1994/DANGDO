import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Button, Typography } from "@mui/material";
import { signUpApi } from "../../../apis";
import { resolve } from "path";
import { rejects } from "assert";

interface Props {
    setAuthView: (authView: boolean) => void,
}

export default function SignUp(props: Props) {
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPwd, setuserPwd] = useState<string>('');
    const [userPwdChk, setuserPwdChk] = useState<string>('');
    const [userName, setuserNickname] = useState<string>('');
    const [userHp, setuserHp] = useState<string>('');
    const [userAddr, setuserAddr] = useState<string>('');
    const [userAddrDetail, setuserAddrDetail] = useState<string>('');
    const [userProfile, setuserProfile] = useState<any>();

    const { setAuthView } = props

    const uploadProfile = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = (e.target.files as FileList)[0];
        
        // 확장자 제한(gif, pdf 형식은 허용하지 않게)을 걸어주셨으면 합니다.
        // 용량 제한도 5mb 이하로 걸어주셨으면 합니다.
        const base64 = await convertBase64(file);
        // console.log(base64);
        setuserProfile(base64);
    };
    const convertBase64 = (file: any) => { // file의 타입?
        return new Promise((resolve,rejects) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            
            fileReader.onload = (() => {
                resolve(fileReader.result);
            });
    
            fileReader.onerror = (() => {
                rejects(Error);
            })
        })
    }

    const signUpHandler = async () => {
        const data = {
            userEmail,
            userPwd,
            userPwdChk,
            userName,
            userHp,
            userAddr,
            userAddrDetail,
            userProfile
        }

        const signUpResponse = await signUpApi(data);
        if (!signUpResponse) {
            alert('회원가입에 실패했습니다.');
            return
        }
        if (!signUpResponse.result) {
            alert('회원가입에 실패했습니다.');
            return
        }
        alert('회원가입에 성공했습니다.')
        setAuthView(false);
    };

    return (
        <><Card sx={{ minWidth: 275, maxWidth: "50vw", padding: 5 }}>
            <Box>
                <Typography variant='h5'>회원가입</Typography>
            </Box>
            <Box height={"50vh"}>
                <TextField fullWidth label="이메일 주소" type="email" variant="standard" onChange={(e) => setUserEmail(e.target.value)} />
                <TextField fullWidth label="비밀번호" type="password" variant="standard" onChange={(e) => setuserPwd(e.target.value)} />
                <TextField fullWidth label="비밀번호 확인" type="password" variant="standard" onChange={(e) => setuserPwdChk(e.target.value)} />
                <TextField fullWidth label="닉네임" variant="standard" onChange={(e) => setuserNickname(e.target.value)} />
                <TextField fullWidth label="휴대폰 번호" variant="standard" onChange={(e) => setuserHp(e.target.value)} />
                <TextField fullWidth label="주소" variant="standard" onChange={(e) => setuserAddr(e.target.value)} />
                <TextField fullWidth label="상세 주소" variant="standard" onChange={(e) => setuserAddrDetail(e.target.value)} />
                <Box display='flex' justifyContent='space-between'>
                    <Typography>프로필 사진</Typography>
                    <Box display='flex'>
                    <img src={userProfile} height="70px" />
                    <Button variant="contained" component="label">
                        Upload
                        <input hidden accept="image/*" multiple type="file" 
                        onChange={(e) => {
                            uploadProfile(e);
                        }}/>
                    </Button>
                    </Box>
                    
                </Box>

            </Box>
            <Box component='div'>

                <Button fullWidth onClick={() => signUpHandler()} variant="contained">
                    회원가입
                </Button>
            </Box>

            <Box component='div' display='flex' mt={2}>
                <Typography>이미 계정이 있으신가요?</Typography>
                <Typography fontWeight={80} ml={1} onClick={() => setAuthView(false)}>로그인</Typography>

            </Box>
        </Card></>
    )
}