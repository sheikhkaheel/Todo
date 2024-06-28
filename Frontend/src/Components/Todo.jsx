import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Todo() {
    const [todoItem, setTodoItem] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/tasks')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTodoItem(data);
            })
            .catch(err => console.error(err));
    }, []);

    const updateInput = (event) => {
        setMessage(event.target.value);
    };

    const submitTodo = (event) => {
        // event.preventDefault(); // Prevent default form submission

        fetch('http://localhost:8000/tasks/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        })
            .then(res => res.json())
            .then(data => {
                setTodoItem([...todoItem, data]); // Update state with new item
                setMessage(''); // Clear input field
            })
            .catch(err => console.error(err));
    };


    const deleteTask = (id) => {
        fetch(`http://localhost:8000/tasks/delete/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: id }),
        })
            .then(res => res.json())
            .then(data => {
                // Filter out the deleted task from todoItem
                const updatedTodoItems = todoItem.filter(item => item._id !== id);
                setTodoItem(updatedTodoItems); // Update state with filtered array
            })
            .catch(err => console.error(err));
    };



    return (
        <div className="container-lg">
            <h1 className="text-5xl pt-10 text-emerald-400 text-center">Todo List</h1>
            <div className="my-5 text-center">
                <form>
                    <input className="mr-4 py-2 w-1/2 px-5 rounded-xl bg-neutral-800 text-white" type="text" value={message} onChange={updateInput} />
                    <input type="submit" className="bg-lime-500 rounded-xl px-5 py-2" onClick={submitTodo} />
                </form>
            </div>
            <div className="bg-neutral-800 mx-40 px-10 py-3">
                <ul className="text-white">
                    {todoItem.map((item) => (
                        <li className={`my-3`} key={item._id}>
                            {item.message}
                            <form className="inline-block mx-2" onSubmit={(e) => deleteTask(item._id)}>
                                <button type="submit"><i className="fa-solid fa-trash text-rose-500"></i></button>
                            </form>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
