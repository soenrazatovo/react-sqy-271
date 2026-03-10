function FormInput({type, name, value, updateFunction}) {
    return ( 
        <div>
            <h6>{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() + " :"}</h6>
            <input 
                type={type}
                name={name == undefined ? type : name}
                placeholder={"Veuillez entrer votre " + (name == undefined ? type : name)}
                value={value}
                onChange={(e) => updateFunction(e)}
                required               
            />
        </div>
     );
}

export default FormInput;