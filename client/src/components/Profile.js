import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchUserProfile,
	uploadProfilePic,
	selectUserFetchStatus,
	selectUser,
} from '../features/User/UserSlice';
import FormData from 'form-data';

const Profile = () => {
	const [defaultProfile, setDefaultProfile] = useState('/images/user.svg');
	const [imageToUpload, setImageToUpload] = useState(null);
	const [fileUploadStatus, setFileUploadStatus] = useState('');
	const dispatch = useDispatch();
	const userData = useSelector(selectUser);
	const userFetchStatus = useSelector(selectUserFetchStatus);
	const { taskList } = useSelector((state) => state.task);

	useEffect(() => {
		dispatch(fetchUserProfile());
	}, [dispatch]);

	const uploadProfile = (e) => {
		e.preventDefault();

		const data = new FormData();

		if (imageToUpload !== null) {
			data.append('avatar', imageToUpload);

			dispatch(uploadProfilePic(data));

			setFileUploadStatus('Profile pic updated');
		}
	};

	const handleImageChange = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setDefaultProfile(reader.result);
				setImageToUpload(e.target.files[0]);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	return (
		<div className="bg-white p-4 sticky top-3 lg:mt-2">
			{userFetchStatus === 'success' ? (
				<div className="items-center flex flex-col space-y-2">
					{userData.avatar && defaultProfile === '/images/user.svg' ? (
						<div className="w-36 h-36 rounded-full">
							<img
								src={`data:image/png;base64,${userData.avatar}`}
								className="rounded-full h-36 w-36"
							/>
						</div>
					) : (
						<img className="h-36 w-36 rounded-full" src={defaultProfile} alt="me" />
					)}

					<p className="text-lg font-semibold">{userData.name}</p>
					<p>Total Tasks : {taskList.length}</p>
					<form onSubmit={uploadProfile} className="flex flex-col items-center space-y-4 relative">
						<input
							className="cursor-pointer absolute block opacity-0 pin-r pin-t top-5"
							type="file"
							name="avatar"
							accept="image/png, image/jpeg , image/jpg"
							onChange={(e) => handleImageChange(e)}
						/>
						<button class="bg-indigo hover:bg-indigo-dark text-black font-bold py-2 px-4 w-full inline-flex items-center text-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								data-icon="upload"
								class="svg-inline--fa fa-upload fa-w-16"
								role="img"
								viewBox="0 0 512 512"
								width="16px"
								height="16px"
							>
								<path
									fill="currentColor"
									d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
								/>
							</svg>
							<span class="ml-2 hover:underline" onChange={(e) => handleImageChange(e)}>
								Profile Pic
							</span>
						</button>
						<input
							type="submit"
							className="cursor-pointer bg-cyan-900 text-white py-1 px-3"
							value="Upload"
						/>
					</form>
					<p>{fileUploadStatus}</p>
				</div>
			) : (
				<p>Loading</p>
			)}
		</div>
	);
};

export default Profile;
