import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { editTask } from '../features/Task/TaskSlice';
import Image from 'next/image';

const EditTaskForm = ({ description, id, toggleIsEditing }) => {
	const dispatch = useDispatch();
	const [taskDescription, setTaskDescription] = useState(description);
	const saveTaskDescription = (e, taskDescription, id) => {
		e.preventDefault();
		dispatch(editTask({ id, taskDescription }));
		toggleIsEditing(false);
	};
	return (
		<form
			className="flex-1 bg-white flex"
			onSubmit={(e) => saveTaskDescription(e, taskDescription, id)}
			method="POST"
		>
			<input
				type="text"
				value={taskDescription}
				onChange={(e) => setTaskDescription(e.target.value)}
				className="flex-1 p-4 bg-white outline-none text-cyan-900 font-semibold"
			/>
			<button className="flex items-center bg-green-500 p-3" type="submit">
				<Image src="/icons/tick.svg" alt="edit" height={20} width={20} />
			</button>
		</form>
	);
};

export default EditTaskForm;
