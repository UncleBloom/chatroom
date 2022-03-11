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
  launchLogRequest: (type: "login" | "register") => void;
}

function InputBars(params: IInputBarParams) {
  return (
    <div className="inputBars">
      <div className="username">
        <div className="iconfont">&#xe621;</div>
        <input
          type="text"
          placeholder="用户名"
          value={params.username}
          onChange={(e) => params.setUsername(e.target.value)}
        />
        {params.LogRegister === "register" ? (
          <Tooltip title="登陆时的用户名，建议使用 QQ 号、手机号等">
            <InfoCircleOutlined />
          </Tooltip>
        ) : (
          <></>
        )}
      </div>

      {params.LogRegister === "register" ? (
        <div className="nickname">
          <div className="iconfont">&#xf00f5;</div>
          <input
            type="text"
            placeholder="用户昵称"
            value={params.nickname}
            onChange={(e) => params.setNickname(e.target.value)}
          />
          <Tooltip title="聊天时展示的用户昵称">
            <InfoCircleOutlined />
          </Tooltip>
        </div>
      ) : (
        <></>
      )}

      <div className="password">
        <div className="iconfont">&#xeae6;</div>
        <input
          type="password"
          placeholder="登陆密码"
          value={params.password}
          onChange={(e) => params.setPassword(e.target.value)}
        />
        {params.LogRegister === "register" ? (
          <Tooltip title="密码由字母和数字组成">
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
