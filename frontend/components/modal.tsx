/**
 *
 * @param modalCallback: is a boolean that is sent to close the modal
 * @param childern: is the content passed to the modal
 * @returns jsx
 */

const Modal = ({ modalCallback, children }: any) => {
    return (
        <div className="bg-white overflow-x-hidden overflow-y-auto flex items-center justify-center rounded-xl shadow-md mx-10 -mt-28 md:-mt-auto">
            <div className="relative w-full h-full max-w-2xl md:h-auto p-5">
                {/* close modal button */}
                <button
                    type="button"
                    onClick={() => modalCallback(false)}
                    className="flex justify-end text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>

                {/* modal content */}
                <div className="my-5 h-auto flex justify-center">{children}</div>
            </div>
        </div>
    )
}

export default Modal
