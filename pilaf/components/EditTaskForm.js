import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { editTask } from '../features/Task/TaskSlice';

const EditTaskForm = ({ description, id, toggleIsEditing }) => {
	const dispatch = useDispatch();
	const [taskDescription, setTaskDescription] = useState(description);
	const saveTaskDescription = (taskDescription, id) => {
		dispatch(editTask({ id, taskDescription }));
		toggleIsEditing(false);
	};
	return (
		<View style={tw`flex-1 bg-white flex flex-row`}>
			<TextInput
				type="text"
				value={taskDescription}
				onChangeText={(text) => setTaskDescription(text)}
				style={tw`flex-1 p-2 bg-white font-semibold font-semibold`}
			/>
			<TouchableOpacity onPress={() => saveTaskDescription(taskDescription, id)}>
				<Icon
					style={tw`bg-green-500 p-3`}
					name="checkmark-circle-outline"
					type="ionicon"
					color="white"
					size={18}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default EditTaskForm;
