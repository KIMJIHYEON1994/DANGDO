import  { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { useUserStore } from '../../../stores'
import Autentication from '../../Authentication'
import BoardMain from '../../BoardMain'
import Navigation from '../../Navigation'

export default function MainLayOut() {
  const [boardResponse, setBoardResponse] = useState<string>('');
 const { logout, username } = useUserStore();
  const cookie =new Cookies();


 useEffect(() => {   
 if(!cookie.get("token"))             
     logout();
 }, [cookie.get("token")]);  

  return (
    <>
          <Navigation />
        {username ? (<BoardMain />) : (<Autentication />)}
    </>
  )
}
