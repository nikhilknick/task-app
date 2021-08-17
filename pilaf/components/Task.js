import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { deleteTask, updateTaskCompletion } from '../features/Task/TaskSlice';
import EditTaskForm from './EditTaskForm';

const Task = ({ description, completed, id }) => {
	const dispatch = useDispatch();

	const [isEditing, toggleIsEditing] = useState(false);

	const toggleTask = (id, completed) => {
		dispatch(updateTaskCompletion({ id, completed }));
	};

	const removeTask = (id) => {
		dispatch(deleteTask(id));
	};

	return (
		<View style={tw`flex flex-row justify-between p-2 mx-2`}>
			{isEditing ? (
				<>
					<EditTaskForm description={description} id={id} toggleIsEditing={toggleIsEditing} />
				</>
			) : (
				<TouchableOpacity style={tw`flex-1`} onPress={() => toggleTask(id, completed)}>
					<Text style={tw`p-3 bg-white font-semibold ${completed ? 'line-through' : ''}`}>
						{description}
					</Text>
				</TouchableOpacity>
			)}

			<TouchableOpacity
				className="button bg-red-500 flex items-center cursor-pointer p-4"
				onPress={() => toggleIsEditing(!isEditing)}
			>
				{isEditing ? (
					<View style={tw`bg-black p-2`}>
						<Icon
							style={tw`p-1`}
							name="close-circle-outline"
							type="ionicon"
							color="white"
							size={18}
						/>
					</View>
				) : (
					<View style={tw`bg-black p-2`}>
						<Icon style={tw`p-1`} name="create-outline" type="ionicon" color="white" size={18} />
					</View>
				)}
			</TouchableOpacity>
			<TouchableOpacity style={tw`bg-red-600 p-3`}>
				<Icon
					onPress={() => removeTask(id)}
					name="trash-outline"
					type="ionicon"
					color="white"
					size={18}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default Task;

const styles = StyleSheet.create({});
