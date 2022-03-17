import { Content } from "antd/lib/layout/layout";
import "./chat.scss";
import Input from "../input/input";

interface IChatParams {}

function Chat(params: IChatParams) {
  const sendMsg = (Content: string) => {};

  return (
    <div className="chat">
      <Input sendMessage={sendMsg} />
    </div>
  );
}

export default Chat;

interface messageInfo {
  content: string;
  messageID: number;
  sentTime: number;
  nickname: string;
  userID: number;
}

const testMessages: messageInfo[] = [
  {
    content: "测试消息：别人发送成功",
    messageID: 0,
    sentTime: 0,
    nickname: "测试用户A",
    userID: 1,
  },
  {
    content: "测试消息：自己发送成功",
    messageID: 1,
    sentTime: 1234567890,
    nickname: "测试用户B",
    userID: 0,
  },
  {
    content: "测试消息：自己发送失败",
    messageID: 1,
    sentTime: 2345678901,
    nickname: "测试用户B",
    userID: 0,
  },
];