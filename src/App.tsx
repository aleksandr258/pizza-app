import { MouseEvent, useState } from 'react';
import './App.css';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import { Link } from 'react-router-dom';




function App() {
	const [counter, setCounter] = useState<number>(0);

	const addCounter = (e: MouseEvent ) => {
		console.log(e);
	};

	return (
		<>
			<Button appearance='small'onClick={addCounter}>кнопка</Button>
			<Button appearance='big'>кнопка</Button>
			<Input></Input>
		</>
	);
}

export default App;
