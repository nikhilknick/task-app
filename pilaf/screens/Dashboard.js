import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import Profile from '../components/Profile';
import Task from '../components/Task';
import {
	addTask,
	getTasks,
	selectTaskFetchStatus,
	selectTaskList,
} from '../features/Task/TaskSlice';

const Dashboard = () => {
	const ref = useRef();
	const dispatch = useDispatch();
	const taskList = useSelector(selectTaskList);
	const taskFetchStatus = useSelector(selectTaskFetchStatus);

	useEffect(() => {
		dispatch(getTasks());
	}, [dispatch]);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const addUserTask = (data) => {
		if (data) {
			dispatch(addTask(data));
			textInput.clear();
		}
	};

	return (
		<View style={tw`pt-10`}>
			<Profile />
			<View style={tw`mx-4 mb-5`}>
				<View style={tw`bg-white`}>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								ref={(input) => {
									textInput = input;
								}}
								placeholder="Create a Task"
								style={styles.input}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
							/>
						)}
						name="description"
						defaultValue=""
					/>
				</View>
				<Button title="Add Task" color="black" onPress={handleSubmit(addUserTask)} />
			</View>
			<View>
				<View>
					<>
						{taskFetchStatus === 'success' ? (
							<FlatList
								data={taskList}
								keyExtractor={(task) => task._id.toString()}
								renderItem={({ item }) => {
									return (
										<Task
											key={item._id}
											description={item.description}
											completed={item.completed}
											id={item._id}
										/>
									);
								}}
							/>
						) : (
							<AnimatedLoader
								visible={true}
								overlayColor="rgba(255,255,255,0.75)"
								source={require('../animation/loader.json')}
								animationStyle={styles.lottie}
								speed={1}
							>
								<Text>Loading...</Text>
							</AnimatedLoader>
						)}
					</>
				</View>
			</View>
		</View>
	);
};

export default Dashboard;

const styles = StyleSheet.create({
	lottie: {
		width: 100,
		height: 100,
	},
	label: {
		color: 'white',
		margin: 20,
		marginLeft: 0,
	},
	button: {
		marginTop: 40,
		color: 'white',
		height: 40,
		backgroundColor: '#ec5990',
		borderRadius: 4,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		// paddingTop: Constants.statusBarHeight,
		padding: 8,
		backgroundColor: '#0e101c',
	},
	input: {
		backgroundColor: 'white',
		// borderColor: 'none',
		height: 40,
		padding: 10,
		borderRadius: 4,
	},
});
