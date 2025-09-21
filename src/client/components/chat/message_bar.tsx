import IMessageBar from "../../types/message_bar";

export default function MessageBar({handleSendMessage, handleMessageChange, message}: IMessageBar) {
    return (
        <>
            <div
                id="message-bar"
                className="w-full bg-white rounded-2xl p-2 sticky bottom-3"
            >
                <form
                    onSubmit={handleSendMessage}
                    className="w-full flex flex-row space-x-full"
                >
                    <div className="flex-1">
                        <input
                            type="text"
                            value={message}
                            onChange={handleMessageChange}
                            className="w-full p-3 text-black"
                            placeholder="send a message"
                        />
                    </div>

                    <div
                        id="send-message-button"
                        className="text-black rounded-full text-xs p-1"
                    >
                        <input
                            type="submit"
                            value={"Send"}
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
