import { useEffect, useState } from "react";

import FormInput from "./FormInput";

import Button from "@mui/material/Button"

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

    async function handleSubmit(e) {
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
                credentials: "include",
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

    async function testToken() {
        const url = "http://localhost:3000/user/protected"
        const res = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        console.log(data)
    }

    return ( 
        <>
            <h2>Formulaire de {formMethod}</h2>
            
            <form onSubmit={(e)=>{handleSubmit(e)}} style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "16px"}}>
                {
                    Object.keys(inputValues).map((key, index) => (
                        
                        <FormInput key={index} type={inputToType[key]} name={key} value={inputValues[key]} updateFunction={updateInput}/>
                    ))
                }
                <Button type="submit" variant="contained">Submit</Button>
            </form>

            <div style={{display: "flex", flexDirection: "column", padding: "16px 25%", gap: "8px"}}>
                <Button variant="contained" onClick={toggleFormMethod}>Go to {formMethod == "Login" ? "Signup" : "Login"}</Button>        
                <Button variant="outlined" onClick={()=>{testToken()}}>Test Protected</Button>
            </div>
        </>
     );
}

export default Form;