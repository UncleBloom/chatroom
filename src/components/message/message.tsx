import { ExclamationCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import "./message.scss";

interface IMessageParams {
  content: string;
  nickname: string;
  nowTime: Date;
  sentTime: number;
  status: "receive" | "sending" | "sent" | "fail";
}

export default function Message(params: IMessageParams) {
  const hsl = hashCode(params.nickname);
  const bgcolor = `hsl(${hsl[0]},${hsl[1]}%,${hsl[2]}%)`;
  return (
    <div className={`message ${params.status}`}>
      <div className="avatar" style={{ background: bgcolor }}>
        <div className="avatarChar">{avatarChar(params.nickname)}</div>
      </div>
      <div className="messageBox">
        <div className="nickname">{params.nickname}</div>
        <div className="text">{params.content}</div>
        <div className="time">
          {timeString(new Date(params.sentTime), params.nowTime)}
        </div>
      </div>
      {params.status === "fail" ? (
        <Popover content="发送失败">
          <ExclamationCircleOutlined />
        </Popover>
      ) : params.status === "sending" ? (
        <Popover content="发送中">
          <SyncOutlined spin />
        </Popover>
      ) : (
        <></>
      )}
    </div>
  );
}

/**
 * 根据数字生成头像颜色的 hsl 量
 * @param nickename 用户昵称
 * @returns [h, s, l]
 */
const hashCode = (nickname: string): number[] => {
  let h = 0,
    s = 0,
    l = 0;
  for (let i = 0; i < nickname.length; i++) {
    h = (h << 4) - h + nickname.charCodeAt(i);
    h |= 0;
    s = (s << 3) - s + nickname.charCodeAt(i);
    s |= 0;
    l = (l << 2) - l + nickname.charCodeAt(i);
    l |= 0;
  }
  h *= 100;
  s *= 10;
  l *= 10;
  h %= 360;
  s %= 30;
  l %= 30;
  return [h, s + 40, l + 40];
};

/**
 * 根据用户昵称获取头像中显示的字母
 * @param nickname 用户昵称
 * @returns 头像中显示的字母
 */
const avatarChar = (nickname: string): string => {
  if (/^[A-Za-z0-9]+$/g) {
    return nickname.substring(0, 2);
  }
  return nickname.substring(nickname.length - 2);
};

const timeString = (past: Date, now: Date): string => {
  if (past.getFullYear() !== now.getFullYear()) {
    return `${past.getFullYear()}/${past.getMonth()+1}/${past.getDate()} ${past.getHours()}:${past.getMinutes()}`;
  } else if (
    past.getMonth() !== now.getMonth() ||
    past.getDate() !== now.getDate()
  ) {
    return `${past.getMonth()+1}/${past.getDate()} ${past.getHours()}:${past.getMinutes()}`;
  } else {
    return `${past.getHours()}:${past.getMinutes()}`;
  }
};
