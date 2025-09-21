export default interface IMessageBar {
    handleSendMessage(e: FormEvent<HTMLFormElement>): void;
    handleMessageChange(e: React.ChangeEvent<HTMLInputElement>): void;
    message: string;
}
