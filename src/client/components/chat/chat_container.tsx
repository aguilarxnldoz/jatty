import IChatContainer from "../../types/chat_container";

export default function ChatContainer({socketRef, chatMessages}: IChatContainer) {
    return (
        <>
            <div
                id="chat-container"
                className="flex-1 overflow-y-auto flex flex-col gap-3"
            >
                {chatMessages.map((message) => (
                    <>
                        {message.sender == socketRef.current?.id ? (
                            <div
                                key={message.sender}
                                id="message-box"
                                className="w-auto p-2 self-end rounded-2xl text-black shadow-md"
                            >
                                <p>{message.message}</p>
                            </div>
                        ) : (
                            <div
                                key={message.sender}
                                id="message-box-alt"
                                className="w-auto p-2 self-start rounded-2xl text-black shadow-md"
                            >
                                <p>{message.message}</p>
                            </div>
                        )}
                    </>
                ))}
            </div>
        </>
    );
}
