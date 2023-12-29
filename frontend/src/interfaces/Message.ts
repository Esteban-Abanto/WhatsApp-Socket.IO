
import UserInfo from './UserInfo'

interface Message {
    sender?: UserInfo;
    message: string;
}

export default Message;