import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(1)

    // Ajoute 1 à la valeur lors de l'appelle donc l'enchainer ne servirait à rien : setCount(count + 1)
    // Ajoute 1 à l valeur actuelle donc on peut les enchainer : setCount(count => count + 1)

    const addOne = () => setCount(count => count + 1)

    return ( 
        <>
            <h1>Count : {count}</h1>
            <button onClick={addOne}>Add 1</button>
        </>
     );
}

export default Counter;