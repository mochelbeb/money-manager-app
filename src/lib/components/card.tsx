type CardProps = {
    title: string;
    value: string;
    description: string;
};

const Card = ({ title, value, description }: CardProps) => {
    return (
        <div className="border rounded-lg p-4 shadow-lg">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-2xl">{value}</p>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default Card;
