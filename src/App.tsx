import { useState } from "react";
import "./App.scss";
import Chat from "./components/chat/chat";
import Login from "./components/login/login";
import IUserInfo from "./types/IUserInfo";

function App() {
  const [logged, setLogged] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    user_id: 0,
    user_name: "",
    nickname: "",
  });
  const [token, setToken] = useState<string>("");

  return (
    <div className="App">
      <Login
        logged={logged}
        logAs={(userInfo: IUserInfo) => {
          setUserInfo(userInfo);
          if (userInfo.user_id !== 0) {
            setLogged(true);
          }
        }}
        setToken={setToken}
      />
      {logged ? <Chat token={token} userInfo={userInfo} /> : <></>}
    </div>
  );
}

export default App;