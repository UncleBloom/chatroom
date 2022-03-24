import { useState } from "react";
import InputBars from "./inputBars";
import "./login.scss";
import { message, Spin } from "antd";
import axios from "axios";
import serverHost from "../../api/hostname";
import IErrRes from "../../types/IErrRes";
import IUserInfo from "../../types/IUserInfo";

interface ILoginParams {
  logged: boolean;
  logAs: (userInfo: IUserInfo) => void;
  setToken: (token: string) => void;
}

function Login(params: ILoginParams) {
  const [LogRegister, setLogRegister] = useState<"login" | "register">("login");
  const [waiting, setWaiting] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameErr, setUsernameErr] = useState<boolean>(false);
  const [nicknameErr, setNicknameErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);

  const checkInputIllegal = (): boolean => {
    let inputIllegal: boolean = false;
    if (!/^(\d|\w|_){5,30}$/g.test(username)) {
      // 检验用户名是否合法
      message.error("用户名不合法:请输入 5-30 位字符", 2);
      inputIllegal = true;
      setUsernameErr(true);
    }
    if (
      // 检验用户昵称是否合法
      LogRegister === "register" &&
      (nickname.length < 1 || nickname.length > 30)
    ) {
      message.error("用户昵称不合法:请输入 1-30 位字符", 2);
      inputIllegal = true;
      setNicknameErr(true);
    }
    if (!/(\d|\w){8,20}$/g.test(password)) {
      // 检验密码输入是否合法
      message.error("密码输入不合法:请输入 8-20 位的数字或大小写字母", 2);
      inputIllegal = true;
      setPasswordErr(true);
    }
    if (waiting) {
      message.warning("正在等待服务器响应", 1);
      inputIllegal = true;
    }

    return inputIllegal;
  };

  const launchLogRequest = async (type: "login" | "register") => {
    if (checkInputIllegal()) {
      return;
    }
    let postData =
      LogRegister === "login"
        ? {
            user_name: username,
            password: password,
          }
        : {
            user_name: username,
            nickname: nickname,
            password: password,
          };
    setWaiting(true);
    axios
      .post(serverHost + `/${LogRegister}`, postData)
      .then((res) => {
        if (type === "register") {
          // 注册
          message.success("注册成功，请登录", 2);
          setLogRegister("login");
        } else {
          // 登录
          let data = res.data as { user_id: number; token: string };
          message.success("登陆成功", 2);
          console.log(data);
          params.logAs({
            user_id: data.user_id,
            user_name: username,
            nickname: nickname,
          });
          params.setToken(data.token);
        }
      })
      .catch((err) => {
        console.log(err);
        if (!err.response) {
          message.error("服务器错误", 2);
        } else {
          let data = err.response.data as IErrRes;
          message.error(data.msg, 2);
        }
      })
      .finally(() => {
        setWaiting(false);
      });
  };

  return (
    <div className={`login ${params.logged ? "logged" : ""}`}>
      <div className="leftMask" />
      <div className="rightMask" />
      <div className="loginBar">
        <div className="info">
          <div className="title">
            {LogRegister === "login" ? "登 录" : "注 册"}
          </div>
          <InputBars
            LogRegister={LogRegister}
            username={username}
            password={password}
            nickname={nickname}
            setUsername={setUsername}
            setNickname={setNickname}
            setPassword={setPassword}
            usernameErr={usernameErr}
            nicknameErr={nicknameErr}
            passwordErr={passwordErr}
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
          {waiting ? (
            <Spin size="large" />
          ) : LogRegister === "login" ? (
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
