import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskCompletion, deleteTask } from '../features/Task/TaskSlice';
import EditTaskForm from '../components/EditTaskForm';
import Image from 'next/image';

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
					<Image src="/icons/cross.svg" alt="edit" height={20} width={20} />
				) : (
					<Image src="/icons/edit.svg" alt="edit" height={20} width={20} />
				)}
			</div>

			<button
				className="button"
				onClick={() => removeTask(id)}
				className="p-4 bg-red-400 flex items-center"
			>
				<Image src="/icons/delete.svg" alt="delete" height={20} width={20} />
			</button>
		</div>
	);
};

export default Task;
