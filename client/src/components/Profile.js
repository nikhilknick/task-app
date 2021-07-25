import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchUserProfile,
	uploadProfilePic,
	selectUserFetchStatus,
	selectUser,
} from '../features/User/UserSlice';
import FormData from 'form-data';
import Image from 'next/image';

const Profile = () => {
	const [defaultProfile, setDefaultProfile] = useState('/images/user.svg');
	const [imageToUpload, setImageToUpload] = useState(null);
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

		data.append('avatar', imageToUpload);

		dispatch(uploadProfilePic(data));
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
		<div>
			{userFetchStatus === 'success' ? (
				<div>
					{userData.avatar && defaultProfile === '/images/user.svg' ? (
						<div className="w-36 h-36 rounded-full">
							<img src={`data:image/png;base64,${userData.avatar}`} className="rounded-full" />
						</div>
					) : (
						<Image
							height={144}
							width={144}
							src={defaultProfile}
							alt="me"
							className="rounded-full"
						/>
					)}
					<form onSubmit={uploadProfile}>
						<input type="file" name="avatar" onChange={(e) => handleImageChange(e)} />
						<input type="submit" className="button" value="upload" />
					</form>
					<p>{userData.name}</p>
					<p>Total Tasks : {taskList.length}</p>
				</div>
			) : (
				<p>Loading</p>
			)}
		</div>
	);
};

export default Profile;
