import { create } from 'zustand';
import { Cookies } from "react-cookie";
import { persist } from "zustand/middleware";
import jwt_decode from "jwt-decode";

interface DecodedToken {
  sub: string;
}

const cookies = new Cookies();
const token = cookies.get("token");
const decoded: string | null = token ? jwt_decode<DecodedToken>(token).sub : null;


console.log(decoded)


interface UserStore {
  username: string | null;
  setUsername: (username: string) => void;
  logout: () => void;
}

const userStore = create<UserStore>()(
  persist(
    (set, get) => ({
      username: decoded,

      setUsername: (username: string | null) => {
        set((state) => ({ ...state, username }));
      },
      logout: () => {
        set((state) => ({ ...state, username: null }));
       },
    }),
    { name: "userStore" }
  )
);

export default userStore;