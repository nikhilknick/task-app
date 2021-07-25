import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Profile from '../components/Profile';
import Task from '../components/Task';
import {
	addTask,
	getTasks,
	selectTaskFetchStatus,
	selectTaskList,
} from '../features/Task/TaskSlice';
import withAuth from '../HOC/withAuth';

const Dashboard = (props) => {
	const dispatch = useDispatch();
	const taskList = useSelector(selectTaskList);
	const taskFetchStatus = useSelector(selectTaskFetchStatus);
	useEffect(() => {
		dispatch(getTasks());
	}, [dispatch]);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const addUserTask = (data) => {
		dispatch(addTask(data));
		reset();
	};

	return (
		<div>
			<Header />
			<div className="border-b-2 border-fuchsia-600">
				<Profile />
			</div>
			<div>
				<form className="flex" onSubmit={handleSubmit(addUserTask)} method="POST">
					<input
						className="border-solid border-2 border-light-blue-500 flex-1"
						{...register('description', {
							required: {
								value: true,
							},
						})}
					/>
					<input className="mt-5 cursor-pointer font-normal py-1" type="submit" value="submit" />
				</form>
			</div>
			<div>
				<>
					{taskFetchStatus === 'success' ? (
						<div>
							{taskList.map((task) => (
								<Task
									key={task._id}
									description={task.description}
									completed={task.completed}
									id={task._id}
								/>
							))}
						</div>
					) : (
						<p>Loading</p>
					)}
				</>
			</div>
		</div>
	);
};

export default withAuth(Dashboard);
