
import IMessage from './IMessage'

interface IChat {
    ID: string;
    title: string;
    messages: IMessage[];
}

export default IChat
