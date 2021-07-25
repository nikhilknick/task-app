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
		<div className="bg-gray-100 min-h-screen">
			<Header />

			<main className="max-w-5xl mx-auto lg:flex">
				<div className="border-b-2 border-fuchsia-600 m-3 lg:w-1/4">
					<Profile />
				</div>
				<div className="w-full">
					<div className="mx-3 my-5">
						<form className="flex flex-1 w-full" onSubmit={handleSubmit(addUserTask)} method="POST">
							<input
								placeholder="Create Task"
								className="border-solid border-2 w-full	 border-light-blue-500 flex-1 px-3 outline-none h-14 text-cyan-900 font-semibold"
								{...register('description', {
									required: {
										value: true,
									},
								})}
							/>
							<input
								className="cursor-pointer p-4 h-14 bg-cyan-900 text-white font-semibold"
								type="submit"
								value="Add Task"
							/>
						</form>
					</div>
					<div className="m-3">
						<>
							{taskFetchStatus === 'success' ? (
								<div className="space-y-1">
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
			</main>
		</div>
	);
};

export default withAuth(Dashboard);
