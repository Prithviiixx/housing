import Link from 'next/link';

const Card = ({ property }) => {

    const { id, property_name, category, description, price, image } = property;

    return (
        <Link href={`/property/${id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
                <img
                    src={`data:image/jpeg;base64,${JSON.parse(image)[0]}`}
                    alt={property_name}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-xl font-bold mb-2 text-black">{property_name}</h3>
                    {category == "Rent" ? <p className="px-2 rounded-md text-black mb-2 bg-orange-500 w-fit">{category}</p> : <p className="px-2 rounded-md text-black mb-2 bg-blue-500 w-fit">{category}</p>}
                    <p className="text-gray-600 mb-2">{description}</p>
                    <p className="text-gray-800 font-bold">${price}</p>
                </div>
            </div>
        </Link>
    );
};

export default Card;