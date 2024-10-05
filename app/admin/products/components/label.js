const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-gray-700 font-medium mb-2">
    {children}
  </label>
);

export default Label;
