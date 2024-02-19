
import IMessage from './IMessage'

interface IChat {
    id: string;
    unreadMessages: number;
    messages: IMessage[];
}

export default IChat
