import "./chat.scss";
import Input from "../input/input";
import Message from "../message/message";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import wsHostname from "../../api/wshost";
import IUserInfo from "../../types/IUserInfo";

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
    ws.current = new WebSocket(wsHostname + "?token=" + params.token);
    ws.current.onopen = () => {
      setConnectReady(true);
    };
    ws.current.close = () => {
      setConnectReady(false);
    };
    ws.current.onmessage = handleReceiveMsg;

    return () => {
      ws.current?.close();
    };
  }, [ws]);

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
    let msgData = event.data as IMessageInfo;
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
        {testMessages.map((msg) => (
          <Message
            key={msg.messageID}
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
