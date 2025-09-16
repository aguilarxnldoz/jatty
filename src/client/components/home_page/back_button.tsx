import {MenuSetter} from "../../types/menu_setter";

export default function BackButton({setMenu}: {setMenu: MenuSetter}) {
    return (
        <>
            <div>
                <button
                    className="rounded-2xl p-3 w-50 text-center border-1 shadow-black shadow-md"
                    onClick={() => setMenu(null)}
                    id="back-button"
                >
                    Back
                </button>
            </div>
        </>
    );
}
