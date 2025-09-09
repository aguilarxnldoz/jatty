export default function JattyMenu({setMenu}: {setMenu: React.Dispatch<React.SetStateAction<number | null>>}) {
    return (
        <>
            <div
                id="jattu-menu"
                className="w-full flex flex-row items-center"
            >
                <div
                    id="jatty-menu-button"
                    className="rounded-2xl p-3"
                >
                    <button onClick={() => setMenu(1)}>create chat</button>
                </div>
                <div
                    id="jatty-menu-button"
                    className="rounded-2xl p-3"
                >
                    <button>join chat</button>
                </div>
            </div>
        </>
    );
}
