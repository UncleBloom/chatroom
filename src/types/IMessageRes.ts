import IUserInfo from "./IUserInfo";
export default interface IMessageRes {
  user: IUserInfo;
  message_id: number;
  message_content: string;
  create_at: number;
}
