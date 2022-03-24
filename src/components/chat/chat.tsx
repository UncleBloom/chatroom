import "./chat.scss";
import Input from "../input/input";
import Message from "../message/message";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import wsHostname from "../../api/wshost";
import IUserInfo from "../../types/IUserInfo";
import { message } from "antd";

interface IChatParams {
  token: string;
  userInfo: IUserInfo;
}

interface IMessageInfo {
  user: {
    user_id: number;
    nickname: string;
  };
  message_content: string;
  send_time: number; // 秒
}

function Chat(params: IChatParams) {
  const [connectReady, setConnectReady] = useState<boolean>(false);
  const [msgList, setMsgList] = useState<IMessageInfo[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const msgWindow = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (params.token !== "") {
      console.log(wsHostname + "/?token=" + params.token);
      ws.current = new WebSocket(wsHostname + "/?token=" + params.token);
      ws.current.onopen = () => {
        setConnectReady(true);
      };
      ws.current.close = () => {
        setConnectReady(false);
      };
      ws.current.onerror = (e) => {
        console.log(e);
        message.error(e, 2);
      };
      ws.current.onmessage = handleReceiveMsg;
    }

    return () => {
      ws.current?.close();
    };
  }, [ws, params.token]);

  useEffect(() => {
    if (msgWindow.current) {
      msgWindow.current.scrollTop = msgWindow?.current?.scrollHeight;
    }
  }, [msgList]);

  const nowTime = new Date();
  const sendMsg = (Content: string) => {
    ws?.current?.send(Content);
  };
  const handleReceiveMsg = (event: MessageEvent) => {
    let msgData = JSON.parse(event.data) as IMessageInfo;
    msgData.send_time *= 1000;
    console.log(msgData);
    if (msgData.user.user_id === params.userInfo.user_id) {
      // 如果接收到的消息是自己发送的则忽略
      return;
    }
    let nextMsgList = msgList;
    nextMsgList.push(msgData);
    setMsgList(nextMsgList);
  };

  return (
    <div className="chat">
      <div className="messages" ref={msgWindow}>
        {msgList.map((msg, index) => (
          <Message
            key={index}
            content={msg.message_content}
            nickname={msg.user.nickname}
            nowTime={nowTime}
            sentTime={msg.send_time}
            status={
              msg.user.user_id === params.userInfo.user_id ? "sent" : "receive"
            }
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
    content:
      "测试消息：别人发送成功。很长很长很长；测试消息：别人发送成功。很长很长很长；测试消息：别人发送成功。很长很长很长；测试消息：别人发送成功。很长很长很长；测试消息：别人发送成功。很长很长很长；测试消息：别人发送成功。很长很长很长；",
    messageID: 0,
    sentTime: 0,
    nickname: "测试用户A",
    userID: 1,
    status: "receive",
  },
  {
    content:
      "测试消息：自己发送成功。测试消息：自己发送成功。测试消息：自己发送成功。测试消息：自己发送成功。测试消息：自己发送成功。测试消息：自己发送成功。测试消息：自己发送成功。",
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
    content:
      "测试消息：自己发送中。测试消息：自己发送中。测试消息：自己发送中。测试消息：自己发送中。测试消息：自己发送中。测试消息：自己发送中。测试消息：自己发送中。",
    messageID: 3,
    sentTime: 987654323,
    nickname: "测试用户B",
    userID: 0,
    status: "sending",
  },
];
