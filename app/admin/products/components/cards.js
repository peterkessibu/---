const Card = ({ children }) => (
    <div className="border rounded-lg p-4 bg-white shadow">{children}</div>
);

export default Card;
export const CardContent = ({ children }) => <div>{children}</div>;
