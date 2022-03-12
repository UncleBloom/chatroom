import { useState } from "react";
import InputBars from "./inputBars";
import "./login.scss";
import { message } from "antd";

interface ILoginParams {}

function Login(params: ILoginParams) {
  const [LogRegister, setLogRegister] = useState<"login" | "register">("login");
  const [username, setUsername] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const launchLogRequest = (type: "login" | "register") => {
    if (username.length < 5 || username.length > 30) {
      message.warning("用户名不合法:请输入 5-30 位字符", 2);
      return;
    }
    if (
      LogRegister === "register" &&
      (nickname.length < 1 || nickname.length > 30)
    ) {
      message.warning("用户昵称不合法:请输入 1-30 位字符", 2);
      return;
    }
    if (!/(\d|\w){8,20}$/g.test(password)) {
      message.warning("密码输入不合法:请输入 8-20 位的数字或大小写字母", 2);
      return;
    }
  };

  return (
    <div className="login">
      <div className="leftMask" />
      <div className="rightMask" />
      <div className="loginBar">
        <div className="info">
          <div className="title">
            {LogRegister === "login" ? "登 陆" : "注 册"}
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
        <div
          className="logButton"
          onClick={() => {
            launchLogRequest(LogRegister);
          }}
        >
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
