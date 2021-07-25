import { logoutUser } from '../features/User/UserSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const Header = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logoutUser());
		localStorage.removeItem('token');
		router.push('/signin');
	};

	return (
		<div className="bg-cyan-900 text-white py-4 font-bold text-3xl">
			<div className="max-w-5xl mx-auto flex justify-between align-middle items-center px-3 sm:pt-0">
				<p className="text-xl sm:text-2xl">Task App</p>
				<p className="text-lg sm:text-xl cursor-pointer" onClick={onLogout}>
					Logout
				</p>
			</div>
		</div>
	);
};

export default Header;
