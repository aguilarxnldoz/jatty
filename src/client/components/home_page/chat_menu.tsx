export default function JattyMenu({setMenu}: {setMenu: React.Dispatch<React.SetStateAction<number | null>>}) {
    return (
        <>
            <div
                id="jattu-menu"
                className="w-full flex flex-col items-center gap-5 min-h-screen justify-center pb-100"
            >
                <div
                    id="jatty-menu-button"
                    className="rounded-2xl p-3 w-50 text-center border-1 shadow-black shadow-md"
                >
                    <button onClick={() => setMenu(1)}>create chat</button>
                </div>
                <div
                    id="jatty-menu-button"
                    className="rounded-2xl p-3 w-50 text-center border-1 shadow-black shadow-md"
                >
                    <button onClick={() => setMenu(2)}>join chat</button>
                </div>
            </div>
        </>
    );
}
