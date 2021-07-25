import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { editTask } from '../features/Task/TaskSlice';

const EditTaskForm = ({ description, id, toggleIsEditing }) => {
	const dispatch = useDispatch();
	const [taskDescription, setTaskDescription] = useState(description);
	const saveTaskDescription = (e, taskDescription, id) => {
		e.preventDefault();
		dispatch(editTask({ id, taskDescription }));
		toggleIsEditing(false);
	};
	return (
		<form onSubmit={(e) => saveTaskDescription(e, taskDescription, id)} method="POST">
			<input
				type="text"
				value={taskDescription}
				onChange={(e) => setTaskDescription(e.target.value)}
			/>
			<input className="button" type="submit" value="save" />
		</form>
	);
};

export default EditTaskForm;
