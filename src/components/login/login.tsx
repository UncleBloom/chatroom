import { useState } from "react";
import InputBars from "./inputBars";
import "./login.scss";

interface ILoginParams {}

function Login(params: ILoginParams) {
  const [LogRegister, setLogRegister] = useState<"login" | "register">("login");
  const [username, setUsername] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const launchLogRequest = (type: "login" | "register") => {};

  return (
    <div className="login">
      <div className="leftMask" />
      <div className="rightMask" />
      <div className="loginBar">
        <div className="info">
          <div className="title">
            {LogRegister === "login" ? "登陆" : "注册"}
          </div>
          <InputBars
            LogRegister={LogRegister}
            username={username}
            password={password}
            nickname={nickname}
            setUsername={setUsername}
            setNickname={setNickname}
            setPassword={setPassword}
            launchLogRequest={launchLogRequest}
          />
          <div
            className="changeType"
            onClick={() => {
              if (LogRegister === "login") setLogRegister("register");
              else setLogRegister("login");
            }}
          >
            {LogRegister === "login"
              ? "没有账号？点击注册"
              : "已有账号？点击登陆"}
          </div>
        </div>
        <div className="logButton">
          {LogRegister === "login" ? (
            <div className="iconfont">&#xe6dd;</div>
          ) : (
            <div className="iconfont">&#xe683;</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
