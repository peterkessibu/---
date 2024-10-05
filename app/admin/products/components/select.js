const Select = ({ value, onValueChange, children }) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded"
  >
    {children}
  </select>
);

export default Select;
