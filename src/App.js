
import React, { useState } from 'react'
import { isEmpty, size } from 'lodash'

import shortid from 'shortid';


function App() {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const [editMode, setEditMode] = useState(false);
	const [id, setId] = useState("");
	const [error, setError] = useState(null);


const style ={
	color: 'red'
};

	//Methods:

	const validForm = () => {
		let isValid = true;
		setError(null);
		if (isEmpty(task)) {
			setError("Debes Ingresar una Tarea.")
			isValid = false;
		}
		return isValid;

	};

	const addTask = (e) => {
		e.preventDefault();
		// if (isEmpty(task)) {
		// 	console.log("Task empty");
		// 	return;
		// };

		if (!validForm()) {
			return;
		}

		const newTask = {
			id: shortid.generate(),
			name: task
		};

		setTasks([...tasks, newTask]);
		setTask("");

	};
	const saveTask = (e) => {
		e.preventDefault();
		// if (isEmpty(task)) {
		// 	console.log("Task Empty!");
		// 	return;
		// }
		if (!validForm()) {
			return;
		}
		const editedTasks = tasks.map(t => t.id === id ? { id, name: task } : t);
		setTasks(editedTasks);
		setEditMode(false);
		setTask("");
		setId("");

	};

	const deleteTask = (id) => {
		// console.log("hi form delete Task....");
		const filteredTasks = tasks.filter(t => t.id !== id);
		setTasks(filteredTasks);
		//  console.log(tasks);
	};

	const editTask = (theTask) => {
		setTask(theTask.name);
		setEditMode(true);
		setId(theTask.id);
	};


	return (
		<div className="container mt-5">
			<h1>Tareas</h1>
			<hr />
			<div className="row">
				<div className="col-8">
					<h4 className="text-center">Lista de Tareas</h4>
					{
						size(tasks) > 0 ? (
							<ul className="list-group">
								{
									tasks.map((task) => (
										<li className="list-group-item" key={task.id}>
											<span className="lead">{task.name}</span>
											<button
												className="btn btn-danger btn-sm float-right"
												onClick={() => deleteTask(task.id)}>
												Eliminar
											</button>
											<button
												className="btn btn-warning btn-sm float-right mx-2"
												onClick={() => editTask(task)}>
												Editar
											</button>
										</li>
									))
								}
							</ul>
						) : (
							// <h5 className="text-center" style={h5Style}>No hay  Tareas Programadas!</h5>							
								<li  className="text-center list-group-item" style={style}>No hay Tareas Programadas.</li>							
						)
					}
				</div>
				<div className="col-4">
					<h4 className="text-center">{editMode ? "Editar Tarea." : "Agregar Tarea."}</h4>
					<form onSubmit={editMode ? saveTask : addTask}>
						{
							 error &&  <span className="text-danger mb-2">{ error }</span>
						}
						<input
							type="text"
							className="form-control mb-2"
							placeholder="Ingrese la Tarea....."
							onChange={(text) => setTask(text.target.value)}
							value={task}
						/>
						<button
							className={editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"}
							type="submit">{editMode ? "Guardar" : "Agregar"}
						</button>
					</form>
				</div>
			</div>

		</div>
	);
}

export default App;
