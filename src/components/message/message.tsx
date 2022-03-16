import "./message.scss";

interface IMessageParams {
  content: string;
  nickname: string;
  user_id: number;
  status: "receive" | "sending" | "sent" | "fail";
}

function Message(params: IMessageParams) {
  return <div className={`message ${params.status}`}></div>;
}

/**
 * 根据数字生成头像颜色的 hsl 量
 * @param num 用户 id
 * @returns [h, s, l]
 */
const hashCode = (num: number): number[] => {
  let h = 0,
    s = 0,
    l = 0;
  while (num > 0) {
    h <<= 4;
    s <<= 3;
    l <<= 2;
    h += num % 10;
    s += num % 9;
    l += num % 8;
    num /= 10;
    h |= 0;
    s |= 0;
    l |= 0;
  }
  h %= 360;
  s %= 30;
  l %= 30;
  return [h, s + 40, l + 40];
};
