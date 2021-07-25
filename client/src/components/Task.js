import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskCompletion, deleteTask } from '../features/Task/TaskSlice';
import EditTaskForm from '../components/EditTaskForm';

const Task = ({ description, completed, id }) => {
	const dispatch = useDispatch();
	const [isEditing, toggleIsEditing] = useState(false);

	const toggleTask = (id, completed) => {
		dispatch(updateTaskCompletion({ id, completed }));
	};

	const removeTask = (id) => {
		console.log('deleting', id);
		dispatch(deleteTask(id));
	};

	return (
		<div className="flex">
			{isEditing ? (
				<>
					<EditTaskForm description={description} id={id} toggleIsEditing={toggleIsEditing} />
				</>
			) : (
				<div onClick={() => toggleTask(id, completed)} className={completed ? 'line-through' : ''}>
					{description}
				</div>
			)}
			<button className="button bg-red-500" onClick={() => toggleIsEditing(!isEditing)}>
				{isEditing ? 'Close' : 'Edit'}
			</button>

			<button className="button" onClick={() => removeTask(id)}>
				Delete
			</button>
		</div>
	);
};

export default Task;
