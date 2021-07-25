import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { signinUser } from './UserSlice';

const Signin = () => {
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			router.push('/dashboard');
		}
	}, []);

	const onSubmit = async (data) => {
		try {
			await dispatch(signinUser(data)).unwrap();
			router.push('/dashboard');
		} catch (rejectedValueOrSerializedError) {
			toast.error('Invalid Credentials');
		}
	};

	return (
		<div className="relative">
			<div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl w-full bg-red-700 z-10"></div>
			<div className="relative bg-white z-20 shadow-lg space-y-3 p-10">
				<h2 className="text-xl font-bold  mb-2">Signin</h2>
				<h3 className="mb-2">Follow the steps</h3>
				<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)} method="POST">
					<label className="flex flex-col">
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
					<label className="flex flex-col mt-5">
						Password
						<input
							className="border-solid border-2 border-light-blue-500"
							{...register('password', {
								required: {
									value: true,
									message: 'Invalid Password',
								},
								minLength: {
									value: 6,
									message: 'Minimum length 6',
								},
							})}
							type="password"
						/>
					</label>
					{errors.password && <div className="error">{errors.password.message}</div>}
					<input className="mt-5 cursor-pointer font-normal py-1" type="submit" value="submit" />
				</form>
				<Toaster
					toastOptions={{
						style: {
							padding: '10px',
							color: '#000',
						},
					}}
				/>
				<div>
					<p className="font-semibold">Create an Account</p>
					<Link href="/signup">
						<p className="cursor-pointer text-cyan-900  text-base hover:underline">Sign up here</p>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Signin;
