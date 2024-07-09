import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function InputBox() {
    const [toDoArray, setToDoArray] = useState([]);
    const [val, setVal] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setToDoArray(storedTodos);
    }, []);

    const handleChange = (e) => {
        setVal(e.target.value);
    };

    const handleClick = () => {
        if (val.trim() === '') {
            return;
        }

        const id = uuidv4();
        const newToDo = { _id: id, toDo: val };
        const updatedTodos = [...toDoArray, newToDo];
        setToDoArray(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setVal('');
    };

    const handleDelete = (toDoId) => {
        const updatedTodos = toDoArray.filter(todo => todo._id !== toDoId);
        setToDoArray(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const handleEdit = (toDoId) => {
        const index = toDoArray.findIndex(todo => todo._id === toDoId);
        setEditIndex(index);
        setVal(toDoArray[index].toDo);
        setIsUpdating(true);
    };

    const handleUpdate = () => {
        if (val.trim() === '') {
            return;
        }

        const updatedTodos = [...toDoArray];
        updatedTodos[editIndex].toDo = val;
        setToDoArray(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setIsUpdating(false);
        setVal('');
        setEditIndex(null);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className='font-bold text-2xl'>To Do App</h1>
            <div className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4">
                <div className="flex">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="toDo"
                        value={val}
                        onChange={handleChange}
                        placeholder="Enter a todo..."
                    />
                    {isUpdating ? (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleUpdate}
                        >
                            Update
                        </button>
                    ) : (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleClick}
                        >
                            Add
                        </button>
                    )}
                </div>
                {toDoArray.map((item) => (
                    <div key={item._id} className="flex items-center justify-between mt-4">
                        {item.toDo !== '' && (
                            <>
                                <span className="text-gray-700">{item.toDo}</span>
                                <div>
                                    <button
                                        className="text-red-500 hover:text-red-700 focus:outline-none"
                                        aria-label="Delete"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        <MdDelete />
                                    </button>
                                    <button
                                        className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                        aria-label="Edit"
                                        onClick={() => handleEdit(item._id)}
                                    >
                                        <CiEdit />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InputBox;
