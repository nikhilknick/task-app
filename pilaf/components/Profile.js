import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import {
	fetchUserProfile,
	logoutUser,
	selectUser,
	selectUserFetchStatus,
} from '../features/User/UserSlice';

const Profile = () => {
	const userData = useSelector(selectUser);
	const userFetchStatus = useSelector(selectUserFetchStatus);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUserProfile());
	}, [dispatch]);

	const onLogout = async () => {
		dispatch(logoutUser());
		await AsyncStorage.removeItem('token');
	};

	return (
		<View style={tw`bg-white p-5 m-4 flex-row justify-between`}>
			{userFetchStatus === 'success' && <Text>Welcome {userData.name}</Text>}
			<Text onPress={onLogout}>Logout</Text>
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({});
