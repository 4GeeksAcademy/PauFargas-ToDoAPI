import React, {useState, useEffect} from "react";

export const ToDosFetch = () =>{
    const baseUrl = "https://playground.4geeks.com/apis/fake/todos/";

    const [task , setTask] = useState("");
    const [list, setList] = useState([])
    const [user, setUser] = useState ("Meriadoc")


    const createTodo = async ()=>{
        const url = baseUrl + "user/" + user;
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify([])
        }
        const response = await fetch( url, options);

        if(response.ok){
            const data = await response.json();
            console.log(data)
        }else{
            //Tratamiento del error
            console.log("Error: ", response.status, response.statusText)
        }
    }

    const getTodo = async () =>{
        const url = baseUrl + "user/" + user;
        const options = {
            method: 'GET'
        }
        const response = await fetch (url,options)

        if (response.ok){
            const data = await response.json();
            console.log(data)
            setList(data)

        }else{console.log("Error: ", response.status, response.statusText)

        }
    }

    const updateTodo = async (newTask) =>{
        const url = baseUrl + "user/" + user;
        const options = {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify([newTask,...list])
        }
        const response = await fetch( url, options);

        if(response.ok){
            const data = await response.json();
            console.log(data)
        }else{
            //Tratamiento del error
            console.log("Error: ", response.status, response.statusText)
        }
    }

    const deleteTodos = async () => {
        const url = baseUrl + "user/" + user;
        const options = {
            method: 'DELETE'
        }
        const response = await fetch (url,options)

        if (response.ok){
            const data = await response.json();
            console.log(data);
            setList([])            
        }else{console.log("Error: ", response.status, response.statusText)

        }
    }
    const deleteTaskInApi = async (id) => {
        try {
            const url = "https://playground.4geeks.com/apis/fake/todos/user/Meriadoc";
            const updatedList = list.filter((_, index) => index !== id);
    
            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedList),
            };
    
            const response = await fetch(url, options);
    
            if (response.ok) {
                const data = await response.json();
                console.log("API Response:", data);
    
                // Actualiza la lista local después de borrar en la API
                setList(updatedList);
            } else {
                console.log("API Error:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Caught an exception:", error);
        }
    };
    

    const addTask = (event) =>{
        event.preventDefault();
        if(task.trim()=== ""){
            return
        };
        const newTask = {
            label: task,
            done : false
        }
        setList([newTask,...list]);
        updateTodo(newTask)
        setTask("")}
    
    

    const handleDelete = async (id) => {
        const updatedList = list.filter((_, index) => index !== id);
         setList(updatedList);
         await deleteTaskInApi(id) 
        };

    return( 
        <div className="container">
            <h1 className="text-center">ToDos</h1>
            <button className="btn btn-warning m-3" onClick={createTodo}>Crear Usuario</button>
            <button className="btn btn-success m-3" onClick={getTodo}>Obtener tareas</button>
            <button className="btn btn-danger m-3" onClick={deleteTodos}>Borrar usuario</button>
            <div className="mb-3">
                <form onSubmit={addTask}>
                    <input className="form-control" placeholder="Write a new Task" type="text" value={task} onChange={(event)=>{setTask(event.target.value);}}/>
                </form>
            </div>

            <h2>To Do List</h2>
            <div className="list">
                <ul className="list-group">
                    {list.map((item,id) =>{
                        return <li key={id} className="list-group-item d-flex">{item.label} - {item.done ? "Completed" : "Pending"}
                        <span><i className="fas fa-times" onClick = {()=> handleDelete(id)}></i></span>
                        </li>
                    }
                    )}
                    
                </ul>
                <div><h6 className="message">{list.length === 0 ? "Congratulations, you do not have tasks!" : `${list.length} Tasks left to do`}</h6></div>
            </div>
        </div>
    )
}
