import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [headingInput, setHeadingInput] = useState('');
    const [listInputs, setListInputs] = useState({});

    const handleAddTodo = () => {
        if (headingInput.trim() !== '') {
            setTodos([...todos, { heading: headingInput, lists:[] }]);
            setHeadingInput('');
        }
    };
    // Función para manejar la  adición de un nuevo elemento de la lista a un encabezado de tarea específico
    const handleAddList = (index) => {
        // Verifica si la entrada para el índice dado no está vacía o solo contiene espacios en blanco
        if (listInputs[index] && listInputs[index].trim() !== '') {
            const newTodos = [...todos]; // Crea una copia del array de tareas actual
            newTodos[index].lists.push(listInputs[index]); // Agrega el nuevo elemento de lista al array de encabezado correspondiente
            setTodos(newTodos); // Actualiza el estado de tareas con el nuevo elemento de lista
            setListInputs({...listInputs, [index]: '' }); //Limpia el campo de entrada para ese índice
        }
    };
    
    // Función para actualizar el valor de entrada de la lista para un índice de encabezado específico
    const handleListInputChange = (index, value) => {
        setListInputs({...listInputs, [index]: value }); // Actualiza el estado de listInputs para el índice correspondiente
    };

    const handleDeleteTodo = (index) => {
        // Crea una copia de superficial del arreglos todos actual
        const newTodos = [...todos];
        // Elimina el todo del índice especificado
        newTodos.splice(index,1);
        // Actualiza el estado con el nuevo arreglo (sin el todo eliminado)
        setTodos(newTodos);
    };

  return (
    <>
      <div className="todo-container">
        <h1 className="title">Mi lista de tareas</h1>
        <div className="input-container">{/* Campo de entrada para ingresar un nuevo encabezado */}
          <input
            type="text"
            className="heading-input" //Clase CSS para el estilo
            placeholder="Ingrese encabezado" //Texto mostrado cuando el campo de entrada está vacío
            value={headingInput}
            onChange={ (e) => {setHeadingInput(e.target.value);} } //Agregar controlador de evento onChange para actualizar el estado de headingInput
          />
          {/* Botón para agregar el encabezado ingresado a la lista de tareas */}
          <button className="add-list-button" onClick={ handleAddTodo }>Agregar Encabezado</button>
        </div>
      </div>
      <div className="todo_main">
        {todos.map((todo, index) => ( //Iterar sobre cada elemento en el arreglo todos
            <div key={index} className="todo-card">
                <div className="heading_todo">
                    {/* Muestra el texto del encabezado del actual elemento todo */}
                    <h3>{todo.heading}</h3> {/* Aquí se muestra el encabezado */}
                    {/* Botón para borrar el encabezado actual mediante su index */}
                    <button className='delete-button-heading' onClick={() => handleDeleteTodo(index)}>Borrar encabezado</button>
                </div>
                <ul>
                    {/* Itera sobre cada elemento de a lista dentro de la tarea actual */}
                    {todo.lists.map((list, listIndex) => (
                        <li key={listIndex} className='todo_inside_list'>
                            {/* Muestra el contenido de texto del elemento de lista */}
                            <p>{list}</p>
                        </li>
                    ))}
                </ul>
                <div className='add_list'>
                    {/* Campo de entrada para agregar un nuevo elemento bajo un encabezado específico */}
                    <input
                        type='text'
                        className='list-input'
                        placeholder='Agregar Lista'
                        value={listInputs[index] || ''} //Usa el valor del array listInputs basado en el índice del encabezado actual
                        onChange={(e) => handleListInputChange(index, e.target.value)}
                    />
                    <button className="add-list-button" onClick={() => handleAddList(index)}>Agregar Lista</button>
                </div>
            </div>
        ))

        }
      </div>
    </>
  );
};

export default TodoList;
