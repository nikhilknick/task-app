import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { signupUser } from './UserSlice';
import Link from 'next/link';

const Signup = () => {
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const router = useRouter();

	const onSubmit = async (data) => {
		try {
			const originalPromiseResult = await dispatch(signupUser(data)).unwrap();
			const { name } = originalPromiseResult.user;
			toast.success(`Welcome ${name}`);
			router.push('/dashboard');
		} catch {
			toast.error('User already exists');
		}
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			router.push('/dashboard');
		}
	}, []);
	return (
		<div className="relative">
			<div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl w-full bg-red-700 z-10"></div>
			<div className="relative bg-white z-20 shadow-lg space-y-3 p-10">
				<h2 className="text-xl font-bold mb-2">Signup</h2>
				<h3 className="mb-2">Follow the steps</h3>
				<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)} method="POST">
					<label className="flex flex-col mt-2">
						Name
						<input
							className="border-solid border-2 border-light-blue-500"
							{...register('name', {
								required: {
									value: true,
									message: 'Name is required',
								},
							})}
						/>
					</label>
					{errors.name && <div className="error">{errors.name.message}</div>}
					<label className="flex flex-col mt-2">
						Email
						<input
							className="border-solid border-2 border-light-blue-500"
							{...register('email', {
								required: {
									value: true,
									message: 'Email is required',
								},
								pattern: {
									value: /^\S+@\S+$/i,
									message: 'Invalid Email',
								},
							})}
						/>
					</label>
					{errors.email && <div className="error">{errors.email.message}</div>}
					<label className="flex flex-col mt-2">
						Password
						<input
							className="border-solid border-2 border-light-blue-500"
							{...register('password', {
								required: {
									value: true,
									message: 'Password is required',
								},
								minLength: {
									value: 6,
									message: 'Minimum length 6',
								},
							})}
							type="password"
						/>
					</label>
					{errors.password && <div className="error text-sm">{errors.password.message}</div>}
					<input className="mt-5 cursor-pointer font-normal py-1" type="submit" value="submit" />
				</form>
				<Toaster
					toastOptions={{
						className: '',
						style: {
							padding: '10px',
							color: '#232F3E',
						},
					}}
				/>
				<div>
					<p className="font-semibold">Already have account?</p>
					<Link href="/signin">
						<p className="cursor-pointer text-cyan-900  text-base hover:underline">Sign in here</p>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Signup;
