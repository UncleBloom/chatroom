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
