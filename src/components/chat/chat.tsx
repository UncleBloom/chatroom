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
    ws.current?.send(JSON.parse(`{"message_content":"${Content}"}`));
    console.log(JSON.parse(`{"message_content":"${Content}"}`));
    let msgData: IMessageInfo = {
      user: {
        user_id: params.userInfo.user_id,
        nickname: params.userInfo.nickname,
      },
      message_content: Content,
      send_time: new Date().getTime(),
    };
    let nextMsgList = msgList.concat(msgData);
    // nextMsgList.push(msgData);
    setMsgList(nextMsgList);
  };
  const handleReceiveMsg = (event: MessageEvent) => {
    let msgData = JSON.parse(event.data) as IMessageInfo;
    msgData.send_time *= 1000;
    console.log(msgData);
    if (msgData.user.user_id === params.userInfo.user_id) {
      // 如果接收到的消息是自己发送的则忽略
      return;
    }
    let nextMsgList = msgList.concat(msgData);
    // nextMsgList.push(msgData);
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