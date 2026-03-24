import { useState } from "react";
import { useEffect } from "react";

function Todo() {

    const [todos, setTodos] = useState([])
    const [newTodoContent, setNewTodoContent] = useState("")

    async function fetchTodos() {
        const res = await fetch("http://localhost:3000/todo", {
            method: "GET",
            headers: {
                "Accept" : "application/json",
                "Content-type" : "application/json",
            }
        })
        const data = await res.json()
        console.log(data)
        setTodos(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (newTodoContent != "") {
            
            const res = await fetch("http://localhost:3000/todo/add", {
                method: "POST",
                body : JSON.stringify({content: newTodoContent}),
                headers: {
                    "Accept" : "application/json",
                    "Content-type" : "application/json",
                }
            })

            const data = await res.json()
            alert(data)

            setNewTodoContent("")
            fetchTodos()
        }


    }
    useEffect(()=>{
        fetchTodos()
    },[])

    return ( 
        <>
            <h1>ToDo List : </h1>
            
            <form onSubmit={handleSubmit} style={{display: "flex", gap: "8px"}}>
                <input type="text" onChange={(e)=>{setNewTodoContent(e.target.value)}} value={newTodoContent} placeholder="Enter your task ..." required/>
                <input type="submit"/>
            </form>

            <div style={{display: "flex", flexDirection: "column", gap: "32px", margin: "32px"}}>
                {todos && todos.map(todo => (
                    <div key={todo.id} style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", width: "fit-content", margin: "auto", backgroundColor: "grey", padding: "16px", borderRadius: "32px"}}>
                        <input type="checkbox" checked={todo.checked} style={{display: "flex", justifyContent: "center", alignItems: "center", width: "fit-content", margin: "0px", boxSizing: ""}}/>
                        <h5>{todo.content}</h5>
                        <button>Delete</button>
                        <h6>{todo.creation_date}</h6>
                    </div>
                ))}
            </div>

        </>
     );
}

export default Todo;