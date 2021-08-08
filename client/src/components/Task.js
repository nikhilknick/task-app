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
		dispatch(deleteTask(id));
	};

	return (
		<div className="flex">
			{isEditing ? (
				<>
					<EditTaskForm description={description} id={id} toggleIsEditing={toggleIsEditing} />
				</>
			) : (
				<div
					onClick={() => toggleTask(id, completed)}
					className={`flex-1 p-4 bg-white font-semibold text-cyan-900 ${
						completed ? 'line-through' : ''
					}`}
				>
					{description}
				</div>
			)}

			<div
				className="button bg-red-500 flex items-center cursor-pointer p-4"
				onClick={() => toggleIsEditing(!isEditing)}
			>
				{isEditing ? (
					<img src="/icons/cross.svg" alt="edit" className="h-5 w-5" />
				) : (
					<img src="/icons/edit.svg" alt="edit" className="h-5 w-5" />
				)}
			</div>

			<button
				className="button"
				onClick={() => removeTask(id)}
				className="p-4 bg-red-400 flex items-center"
			>
				<img src="/icons/delete.svg" alt="delete" className="h-5 w-5" />
			</button>
		</div>
	);
};

export default Task;
