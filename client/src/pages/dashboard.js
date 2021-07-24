import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { getTasks } from '../features/Task/TaskSlice';
import withAuth from '../HOC/withAuth';

const Dashboard = (props) => {
	const dispatch = useDispatch();
	const { name } = useSelector((state) => state.user.user);
	const { taskList, status } = useSelector((state) => state.task);

	useEffect(() => {
		dispatch(getTasks())
			.then((res) => {
				console.log('res', res);
			})
			.catch((e) => {
				console.log('e', e);
			});
	}, [dispatch]);

	return (
		<div>
			<Header />
			This is dashboard
			<p>{props.count}</p>
			<p>user :{name}</p>
			{status === 'loading' ? (
				<p>Loading</p>
			) : (
				<div>
					{taskList.map((task) => (
						<p key={task._id}>{task.description}</p>
					))}
				</div>
			)}
		</div>
	);
};

export default withAuth(Dashboard);
