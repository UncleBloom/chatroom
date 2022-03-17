import { useState } from "react";
import { message } from "antd";
import "./input.scss";
import TextArea from "antd/lib/input/TextArea";

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
      <div className="textareaContainer">
        <TextArea
          autoSize={{ minRows: 1, maxRows: 3 }}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
      <button onClick={handleSendMsg}>发 送</button>
    </div>
  );
}
