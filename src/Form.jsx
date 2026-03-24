import { useEffect, useState } from "react"; // Faster : "is" + enter
import FormInput from "./FormInput";

function Form() {

    const [formMethod, setFormMethod] = useState("Login")
    const [inputValues, setInputValues] = useState({email : "", password : ""})

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
    } 

    async function submit(e) {
        e.preventDefault()
        
        const emailPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
        const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

        let isFormValid = true

        if (!emailPattern.test(inputValues.email)) {
            alert("Email invalide")
            isFormValid = false
        } else if (!passwordPattern.test(inputValues.password)) {
            alert("Mdp invalide")
            isFormValid = false
        } else if (!(!inputValues.confirm || inputValues.password == inputValues.confirm)){
            alert("Confirmation de Mdp invalide")
            isFormValid = false
        }

        if (isFormValid) {
            const url = "http://localhost:3000/user/" + formMethod.toLowerCase()
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(inputValues)
            })
            const data = await res.json()
            console.log(data)
        }
    }

    return ( 
        <>
            <button onClick={toggleFormMethod}>Go to {formMethod == "Login" ? "Signup" : "Login"}</button>        
            
            <h2>Formulaire de {formMethod}</h2>
            
            <form onSubmit={(e)=>{submit(e)}}>
                {
                    Object.keys(inputValues).map((key, index) => (
                        <FormInput key={index} type={inputToType[key]} name={key} value={inputValues[key]} updateFunction={updateInput}/>
                    ))
                }
                <input type="submit" value="Submit"/>
            </form>
        </>
     );
}

export default Form;