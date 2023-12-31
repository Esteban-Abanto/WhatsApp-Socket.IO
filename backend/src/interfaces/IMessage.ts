import IUser from './IUser';

interface IMessage {
    recipient: string;
    sender?: IUser;
    text: string;
}

export default IMessage;