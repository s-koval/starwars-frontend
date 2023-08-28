
export const RebellionsList = ({list}) => {
    return (
        <div>
            <ul className="flex flex-col flex-wrap list mx-auto justify-between">
                {list.map(item => (
                    <li className="flex mx-2 mb-4 bg-slate-200 p-2">
                        <img src={item.image} alt={item.name} className="me-5"/>
                        <div>
                            <h1 className="font-bold text-lg">{item.name}</h1>
                            <p>Species: {item.species}</p>
                            <p>Home world: {item.homeworld}</p>
                            <p>Skin color: {item.skinColor}</p>
                            <p>Eye color: {item.eyeColor}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};
