import { useState, useEffect } from "react";

function Todo() {

    const [todos, setTodos] = useState([])
    const [newTodoContent, setNewTodoContent] = useState("")
    const [idEditTodo, setIdEditTodo] = useState()
    const [contentEditTodo, setContentEditTodo] = useState()

    async function fetchTodos() {
        const res = await fetch("http://localhost:3000/todo", {
            method: "GET",
            headers: {
                "Accept" : "application/json",
                "Content-type" : "application/json",
            }
        })
        const data = await res.json()
        // console.log(data)
        setTodos(data)
    }

    async function fetchTodo(id) {
        const res = await fetch("http://localhost:3000/todo/"+id, {
            method: "GET",
            headers: {
                "Accept" : "application/json",
                "Content-type" : "application/json",
            }
        })
        const data = await res.json()
        console.log(data)
        return data[0]
    }

    async function handleSubmit(e){
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
            const newTodo = await fetchTodo(data.insertId)

            setNewTodoContent("")
            setTodos(todos => [...todos, newTodo])
            
        }
    }

    async function handleDelete(id) {
        const res = await fetch("http://localhost:3000/todo/delete", {
            method: "DELETE",
            body : JSON.stringify({id}),
            headers: {
                "Accept" : "application/json",
                "Content-type" : "application/json",
            }
        })

        const data = await res.json()
        alert(data)
        setTodos(todos => todos.filter(todo => (todo.id != id)))
    }

    async function handleCheckboxChange(e, todo) {

        const res = await fetch("http://localhost:3000/todo/modify", {
            method: "PUT",
            body : JSON.stringify({id: todo.id, content: todo.content, checked: e.target.checked}),
            headers: {
                "Accept" : "application/json",
                "Content-type" : "application/json",
            }
        })

        const data = await res.json()
        console.log(data)

        fetchTodos()
    }

    async function handleContentChange(todo) {

        if (todo.content != contentEditTodo){
            const res = await fetch("http://localhost:3000/todo/modify", {
                method: "PUT",
                body : JSON.stringify({id: todo.id, content: contentEditTodo, checked: todo.checked}),
                headers: {
                    "Accept" : "application/json",
                    "Content-type" : "application/json",
                }
            })
            const data = await res.json()
            console.log(data)
            todo.content = contentEditTodo
        }

        setIdEditTodo()
    }

    

    useEffect(()=>{
        fetchTodos()
    },[])

    useEffect(()=>{
        console.log(todos)
    },[todos])

    return ( 
        <>
            <h1>ToDo List : </h1>

            <form onSubmit={(e)=>{handleSubmit(e)}} style={{display: "flex", gap: "8px"}}>
                <input type="text" onChange={(e)=>{setNewTodoContent(e.target.value)}} value={newTodoContent} placeholder="Enter your task ..." required/>
                <input type="submit"/>
            </form>

            <div style={{display: "flex", flexDirection: "column", gap: "32px", margin: "32px"}}>
                {todos ? 
                    todos.map(todo => (
                        <div key={todo.id} style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", width: "fit-content", margin: "auto", backgroundColor: "grey", padding: "16px", borderRadius: "32px"}}>
                            <input type="checkbox" onChange={(e)=>{handleCheckboxChange(e, todo)}} checked={todo.checked} style={{display: "flex", justifyContent: "center", alignItems: "center", width: "fit-content", margin: "0px", boxSizing: ""}}/>
                            
                            {idEditTodo != todo.id ?
                                <>
                                    <h5 style={{textDecoration: todo.checked ? "line-through" : "none"}}>{todo.content}</h5>
                                    <button onClick={()=>{setIdEditTodo(todo.id); setContentEditTodo(todo.content)}}>Edit</button>
                                </>
                            :
                                <>
                                    <input type="text" onChange={(e)=>{setContentEditTodo(e.target.value)}} value={contentEditTodo}/>
                                    <button onClick={()=>{handleContentChange(todo)}}>Confirm</button>
                                </>
                            }

                            <button onClick={()=>{handleDelete(todo.id)}}>Delete</button>
                            <h6>{todo.creation_date}</h6>
                        </div>
                    ))
                :
                    <h2>Vous n'avez pas encore de Todo</h2>
                }
            </div>

        </>
     );
}

export default Todo;