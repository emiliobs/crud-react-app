/* eslint-disable no-undef */
import React, { useState } from 'react'
import { isEmpty, size } from 'lodash'
import shortid from 'shortid';


function App() {
	const [task, setTask] = useState("")
	const [tasks, setTasks] = useState([]);

	//Methods:
	const addTask = (e) => {
		e.preventDefault();
		if (isEmpty(task)) {
			console.log("Task empty");
			return;
		};

		const newTask = {
			id: shortid.generate(),
			name: task
		};
		setTasks([...tasks, newTask]);

		// console.log(tasks);
		setTask("");
	}

	const deleteTask = (id) => {
		// console.log("hi form delete Task....");
		const filteredTasks = tasks.filter(t => t.id !== id);
		setTasks(filteredTasks);
		//  console.log(tasks);
	};

	const h5Style = {
		color: "red"
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
												className="btn btn-warning btn-sm float-right mx-2">
												Editar
										</button>
										</li>
									))
								}
							</ul>
						) : (
							<h5 className="text-center" style={h5Style}>No hay  Tareas Programadas!</h5>
						)
					}
				</div>
				<div className="col-4">
					<h4 className="text-center">Formulario</h4>
					<form onSubmit={addTask}>
						<input
							type="text"
							className="form-control mb-2"
							placeholder="Ingrese la Tarea....."
							onChange={(text) => setTask(text.target.value)}
							value={task}
						/>
						<button className="btn btn-dark btn-block" type="submit">Agregar</button>
					</form>
				</div>
			</div>

		</div>
	);
}

export default App;
