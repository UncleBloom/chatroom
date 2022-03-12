import "./inputBars.scss";
import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

interface IInputBarParams {
  LogRegister: "login" | "register";
  username: string;
  nickname: string;
  password: string;
  setUsername: (value: string) => void;
  setNickname: (value: string) => void;
  setPassword: (value: string) => void;
  usernameErr: boolean;
  nicknameErr: boolean;
  passwordErr: boolean;
  launchLogRequest: (type: "login" | "register") => void;
}

function InputBars(params: IInputBarParams) {
  return (
    <div className="inputBars">
      <div className={"username " + (params.usernameErr ? "inputErr" : "")}>
        <div className="iconfont">&#xe621;</div>
        <input
          type="text"
          placeholder="用户名"
          value={params.username}
          onChange={(e) => params.setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              params.launchLogRequest(params.LogRegister);
            }
          }}
        />
        {params.LogRegister === "register" ? (
          <Tooltip title="独一无二的登陆用户名，由5-30位字符组成（建议使用 QQ 号、手机号等不与他人重复的数字/字符串）">
            <InfoCircleOutlined />
          </Tooltip>
        ) : (
          <></>
        )}
      </div>

      {params.LogRegister === "register" ? (
        <div className={"nickname " + (params.nicknameErr ? "inputErr" : "")}>
          <div className="iconfont">&#xf00f5;</div>
          <input
            type="text"
            placeholder="用户昵称"
            value={params.nickname}
            onChange={(e) => params.setNickname(e.target.value)}
          />
          <Tooltip title="聊天时展示的用户昵称，由1-30位字符组成">
            <InfoCircleOutlined />
          </Tooltip>
        </div>
      ) : (
        <></>
      )}

      <div className={"password " + (params.passwordErr ? "inputErr" : "")}>
        <div className="iconfont">&#xeae6;</div>
        <input
          type="password"
          placeholder="登陆密码"
          value={params.password}
          onChange={(e) => params.setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              params.launchLogRequest(params.LogRegister);
            }
          }}
        />
        {params.LogRegister === "register" ? (
          <Tooltip title="密码由8-20位大小写字母或数字组成">
            <InfoCircleOutlined />
          </Tooltip>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default InputBars;
