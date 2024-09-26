// components/FileUpload.js
import Image from 'next/image';

const FileUpload = ({ label, preview, onFileChange, onDrop }) => {
    return (
        <div className="mb-6">
            <label className="block text-gray-600">{label}</label>
            <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 mb-4"
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                {preview ? (
                    <Image src={preview} alt={`${label} Preview`} width={300} height={300} className="h-32 mx-auto mb-2" />
                ) : (
                    <p>Drag & drop your {label} here, or click to upload.</p>
                )}
                <input
                    type="file"
                    id={label.replace(/\s+/g, '')}
                    onChange={onFileChange}
                    className="hidden"
                />
                <button
                    type="button"
                    onClick={() => document.getElementById(label.replace(/\s+/g, '')).click()}
                    className="mt-2 text-blue-600 underline"
                >
                    Upload from Device
                </button>
            </div>
        </div>
    );
};

export default FileUpload;
