import "./chat.scss";
import Input from "../input/input";
import Message from "../message/message";

interface IChatParams {}

function Chat(params: IChatParams) {
  const sendMsg = (Content: string) => {};
  const nowTime = new Date();

  return (
    <div className="chat">
      <div className="messages">
        {testMessages.map((msg) => (
          <Message
            content={msg.content}
            nickname={msg.nickname}
            user_id={msg.userID}
            nowTime={nowTime}
            sentTime={msg.sentTime}
            status={msg.status}
          />
        ))}
      </div>
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
  status: "receive" | "sending" | "sent" | "fail";
}

const testMessages: messageInfo[] = [
  {
    content: "测试消息：别人发送成功",
    messageID: 0,
    sentTime: 0,
    nickname: "测试用户A",
    userID: 1,
    status: "receive",
  },
  {
    content: "测试消息：自己发送成功",
    messageID: 1,
    sentTime: 1234567890,
    nickname: "测试用户B",
    userID: 0,
    status: "sent",
  },
  {
    content: "测试消息：自己发送失败",
    messageID: 2,
    sentTime: 2345678901,
    nickname: "测试用户B",
    userID: 0,
    status: "fail",
  },
  {
    content: "测试消息：自己发送中",
    messageID: 3,
    sentTime: 987654323,
    nickname: "测试用户B",
    userID: 0,
    status: "sending",
  },
];
