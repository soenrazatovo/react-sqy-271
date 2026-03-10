function Props({user, contents}) {
    return ( 
        <>
            <h2> Props : You name is {user.name} and you are {user.age} years old</h2>
            <ul>
                {contents.map((elem, index) => (
                    <li key={index}> 
                        {elem.content} 
                        <button onClick={() => alert(elem.content)}>Show</button>
                    </li>
                ))}
            </ul>
        </> 
    );
}

export default Props;