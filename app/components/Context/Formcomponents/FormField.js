// components/FormField.js
const FormField = ({ label, type, value, onChange, required }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-600">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-3"
                required={required}
            />
        </div>
    );
};

export default FormField;
