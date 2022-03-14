import { useState } from "react";
import "./App.scss";
import Login from "./components/login/login";
import IUserInfo from "./types/IUserInfo";

function App() {
  const [logged, setLogged] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    user_id: 0,
    username: "",
    nickname: "",
  });

  return (
    <div className="App">
      <Login
        logAs={(userInfo: IUserInfo) => {
          setUserInfo(userInfo);
          if (userInfo.user_id !== 0) {
            setLogged(true);
          }
        }}
      />
    </div>
  );
}

export default App;