import { useEffect, useState } from "react"; // Faster : "is" + enter
import FormInput from "./FormInput";

function Form() {

    const [formMethod, setFormMethod] = useState("Login")
    const [inputValues, setInputValues] = useState({email : "", password : ""})

    // useEffect appelle la fonction lorsque la variable est modifié

    // let inputList = (formMethod == "Login" ? {email : "", password : ""} : {pseudo : "", email : "", password : "", confirm : ""})
    // useEffect(()=>{setInputValues(inputList)}, [formMethod])

    const toggleFormMethod = () => {

        let nextFormMethod = formMethod == "Login" ? "Signup" : "Login"

        let inputList = (nextFormMethod == "Login" ? {email : "", password : ""} : {pseudo : "", email : "", password : "", confirm : ""})
        setInputValues(inputList)
        
        setFormMethod(nextFormMethod)
    }
    
    const inputToType = {
        pseudo : "text",
        email : "email",
        password : "password",
        confirm : "password"
    }

    function updateInput(event) {

        // Fait une copie de inputValue (Spread Operator ...) en modifiant des valeurs
        // Nom de la clé variable donc on rajoute des crochets => [key] : value
        setInputValues({... inputValues, [event.target.name]: event.target.value})
        
        // console.log(inputValues)
    } 

    return ( 
        <>
            <h2>Formulaire de {formMethod}</h2>
            
            <button onClick={toggleFormMethod}>Go to {formMethod == "Login" ? "Signup" : "Login"}</button>        
            
            {
                Object.keys(inputValues).map((key, index) => (
                    <FormInput key={index} type={inputToType[key]} name={key} value={inputValues[key]} updateFunction={updateInput} />
                ))
            }

        </>
     );
}

export default Form;