import { useState } from "react";
import { message } from "antd";
import "./input.scss";

interface IInputParams {
  sendMessage: (content: string) => void;
}

export default function Input(params: IInputParams) {
  const [text, setText] = useState<string>("");
  const handleSendMsg = () => {
    if (text === "") {
      message.warning("发送消息不能为空", 1);
    } else {
      params.sendMessage(text);
      setText("");
    }
  };
  return (
    <div className="input">
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMsg();
          }
        }}
      />
      <button onClick={handleSendMsg}>发 送</button>
    </div>
  );
}
