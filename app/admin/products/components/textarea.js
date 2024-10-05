const Textarea = ({ id, value, onChange, placeholder, rows }) => (
  <textarea
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className="w-full p-2 border border-gray-300 rounded"
  />
);

export default Textarea;
