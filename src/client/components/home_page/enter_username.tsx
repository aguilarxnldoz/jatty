export default function EnterUsername() {
    return (
        <>
            <div
                id="create-username"
                className="w-auto relative"
            >
                <form acceptCharset="">
                    <label className="block">
                        <p>Enter a username!</p>
                        <input
                            type="text"
                            id="create-chat-input"
                            placeholder="anonymous"
                            className="p-1.5 border-1 border-white w-auto rounded-md shadow-md"
                        />
                    </label>
                    <div className="mt-10">
                        <label className="inline bg-neutral-500 p-3">
                            <button>Cancel</button>
                        </label>
                        <label className="inline bg-neutral-500 p-3">
                            <button>Go!</button>
                        </label>
                    </div>
                </form>
            </div>
        </>
    );
}
