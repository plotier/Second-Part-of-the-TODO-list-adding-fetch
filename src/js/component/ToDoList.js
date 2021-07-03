import React, { useState, useEffect } from "react";

export const ToDoList = () => {
	const [inputValue, setInputValue] = useState("");
	const [taskList, setTaskList] = useState([]);
	const url = "https://assets.breatheco.de/apis/fake/todos/user/plotier";
	useEffect(() => {
		fetch(url)
			.then(response => response.json()) //Header o saber qué pasó con llamada
			.then(data => {
				// Se procesa la información
				setTaskList(data);
			});
	}, []);
	useEffect(() => {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(taskList),
			headers: {
				"Content-Type": "application/json"
			}
		});
	}, [taskList]);
	const listaItems = taskList.map((item, index) => {
		return (
			<div key={index}>
				<li className="Example list-group-item d-flex justify-content-between">
					{item.label}
					<i
						className="fas fa-times"
						onClick={() => {
							let holder = taskList.filter(
								(task, i) => i != index
							);
							setTaskList(holder);
						}}></i>
				</li>
			</div>
		);
	});
	return (
		<div>
			<input
				type="text"
				onChange={e => setInputValue(e.target.value)}
				value={inputValue}
			/>
			<button
				onClick={e =>
					setTaskList([
						...taskList,
						{ label: inputValue, done: false }
					])
				}>
				Add
			</button>
			<ul className="list-group">{listaItems}</ul>
		</div>
	);
};
