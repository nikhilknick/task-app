import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { signupUser } from '../features/User/UserSlice';

const Signup = ({ toggleSignPage }) => {
	const dispatch = useDispatch();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			await dispatch(signupUser(data)).unwrap();
		} catch (rejectedValueOrSerializedError) {}
	};
	return (
		<View style={tw`relative flex-1`}>
			<View
				style={[
					tw`relative bg-white z-20 shadow-lg p-10 pt-7 flex-1 bg-gray-100`,
					{ borderTopRightRadius: 40, borderTopLeftRadius: 40, overflow: 'hidden' },
				]}
			>
				<Text style={tw`text-xl font-bold  mb-3 text-black`}>Signup</Text>
				<Text style={tw`mb-4`}>Follow the steps</Text>
				<View>
					<Text style={tw`mb-2`}>Name</Text>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={styles.input}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
							/>
						)}
						name="name"
						defaultValue=""
					/>
					{errors.name && <Text style={tw`text-sm text-red-500`}>This is required.</Text>}
					<Text style={tw`mb-2`}>Email</Text>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={styles.input}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
							/>
						)}
						name="email"
						defaultValue=""
					/>
					{errors.email && <Text style={tw`text-sm text-red-500`}>This is required.</Text>}
					<Text style={tw`mb-2`}>Password</Text>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={styles.input}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
							/>
						)}
						name="password"
						defaultValue=""
					/>
					{errors.password && <Text style={tw`text-sm text-red-500`}>This is required.</Text>}

					<TouchableOpacity style={styles.button} title="Submit" onPress={handleSubmit(onSubmit)}>
						<Text style={tw`text-white`}>Submit</Text>
					</TouchableOpacity>

					<View style={tw`items-center mt-5`}>
						<Text style={tw`text-black`} onPress={() => toggleSignPage('Signin')}>
							Already member, Sign in
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default Signup;
const styles = StyleSheet.create({
	label: {
		color: 'white',
		margin: 20,
		marginLeft: 0,
	},
	button: {
		marginTop: 20,
		color: 'white',
		height: 40,
		backgroundColor: '#000',
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 8,
		backgroundColor: '#0e101c',
	},
	input: {
		backgroundColor: 'white',
		marginBottom: 5,
		height: 40,
		padding: 10,
		borderRadius: 4,
	},
});
