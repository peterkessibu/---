// components/Modal.js
const Modal = ({ title, content, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
                <h2 className="text-2xl mb-4">{title}</h2>
                <div className="mb-4">{content}</div>
                <button onClick={onClose} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
