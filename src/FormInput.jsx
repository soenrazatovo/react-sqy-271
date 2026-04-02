import TextField from '@mui/material/TextField';

function FormInput({type, name, value, updateFunction}) {
    return ( 
        <TextField 
            type={type}
            variant="filled"
            label={name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
            name={name}
            placeholder={"Please enter your " + name}
            value={value}
            onChange={(e) => updateFunction(e)}
            minLength={type == "password" ? 8 : ""}
            required   
            sx={{width: "50%"}}            
        />
     );
}

export default FormInput;