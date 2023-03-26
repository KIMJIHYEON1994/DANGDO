import { Button, Card, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import  { useState } from 'react'
import { signInApi } from '../../../apis';
import  { useUserStore } from '../../../stores';

interface propry {
    setAuthView : (authView: boolean) => void,
}

export default function SignIn(props:propry) {

    const [userEmail, setUserEmail] = useState<string>("");
    const [userPwd, setUserPassword] = useState<string>("");
    const {username, setUsername} = useUserStore();

 
    const { setAuthView } = props;

    const signInHandle = async () => {
        if (userEmail.length === 0 || userPwd.length === 0) {
            alert('이메일과 비밀번호를 입력하세요');
            return;
        }

        const data = {
            userEmail,
            userPwd
        };

        const signInResponse = await signInApi(data);

        const user = signInResponse;
        setUsername(user);
       

    };

    return (
        <Card sx={{ minWidth: 275, maxWidth: "50vw", padding: 5 }}>
            <Box>
                <Typography variant='h5'>로그인</Typography>
            </Box>
                <Box height={'50vh'} >
                    <TextField
                        fullWidth
                        label="이메일"
                        variant='standard'
                        type="email"
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="비밀번호"
                        type="password"
                        variant='standard'
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                </Box>
                <Box component='div'>
                    <Button fullWidth onClick={() => signInHandle()} variant="contained">
                        로그인
                    </Button>
                </Box>
                <Box component='div' display='flex' mt={2}>
                    <Typography>신규 사용자 이신가요?</Typography>
                    <Typography fontWeight={800} ml={1} onClick={() => setAuthView(true)}>회원가입</Typography>
                </Box>
        </Card>
    )
}



/** import React from 'react';

function App() {
  const human = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
  ];

  return (
    <div>
      {human.map(person => (
        <Human name={human.name} age={human.age} />
      ))}
    </div>
  );
}

function Human(props) {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}
 */