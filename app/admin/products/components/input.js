const Input = ({
    id,
    type = "text",
    value,
    onChange,
    placeholder,
    readOnly = false,
}) => (
    <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className="w-full p-2 border border-gray-300 rounded"
    />
);

export default Input;
