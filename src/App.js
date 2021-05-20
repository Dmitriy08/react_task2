import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Row, Col} from 'reactstrap'
import {setTodos, startLoad, endLoad} from './actions';
import SearchTodos from "./components/SearchTodos/SearchTodos";
import AddTodo from "./components/AddTodo/AddTodo";
import ListProgress from "./components/ListProgress/ListProgress";
import ListDone from "./components/ListDone/ListDone";

const App = props => {

	const [newTodoName, setNewTodo] = useState('');
	const [searchKey, setSearchKey] = useState('');
	const dispatch = useDispatch();
	let todos = useSelector(state => state.todos);
	let fetching = useSelector(state => state.fetching);

	useEffect(() => {
		fetch('/todos.json')
			.then(res => res.json())
			.then(list => {
				dispatch(startLoad())
				dispatch(setTodos(list))
				dispatch(endLoad())
			})
	}, [])

	const filteredTodos = useMemo(() => {
		if(searchKey){
			let newTodos = {}
			Object.keys(todos).forEach(key => {
				let filterTodos = todos[key]?.filter(item => item.name.toLowerCase().includes(searchKey.toLowerCase()));
				newTodos[key] = []
				newTodos[key].push(...filterTodos)
			})
			return newTodos
		}
		return todos
	}, [todos, searchKey])

	const loading = <p>Loading...</p>;

	return (
		<Container>
			<h1>Todo React APP</h1>
			<h2>Todos search</h2>
			<Row>
				<Col>
					<SearchTodos searchKey={searchKey} setSearchKey={setSearchKey}/>
				</Col>
			</Row>
			<hr/>
			<h2>Todos</h2>
			<Row>
				<Col>
					<AddTodo newTodoName={newTodoName} setNewTodo={setNewTodo}/>
				</Col>
			</Row>
			<hr/>
			<Row>
				<Col sm="6">
					<h3>Todos in progress</h3>
					<ListProgress filteredTodos={filteredTodos} todos={todos} fetching={fetching} loading={loading}/>
				</Col>
				<Col sm="6">
					<h3>Done</h3>
					<ListDone loading={loading} fetching={fetching} filteredTodos={filteredTodos}/>
				</Col>
			</Row>
		</Container>
	);
};

export default App;