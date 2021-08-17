import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { signinUser } from '../features/User/UserSlice';

const Signin = ({ toggleSignPage }) => {
	const dispatch = useDispatch();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			await dispatch(signinUser(data)).unwrap();
		} catch (rejectedValueOrSerializedError) {
			// toast.error('Invalid Credentials');
		}
	};
	return (
		<View style={tw`relative flex-1`}>
			<View style={tw`absolute inset-0 w-full z-10`}></View>
			<View
				style={[
					tw`relative bg-white z-20 shadow-lg p-10 flex-1 bg-gray-100`,
					{ borderTopRightRadius: 40, borderTopLeftRadius: 40, overflow: 'hidden' },
				]}
			>
				<Text style={tw`text-xl font-bold mb-3 text-black`}>Signin</Text>
				<Text style={tw`mb-6`}>Follow the steps</Text>
				<View>
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
				</View>

				<View style={tw`items-center mt-9`}>
					<Text style={tw`text-black`} onPress={() => toggleSignPage('SignUp')}>
						New to Task Manager, Sign up
					</Text>
				</View>
			</View>
		</View>
	);
};

export default Signin;

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
		borderRadius: 10,
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
		marginBottom: 10,
		height: 40,
		padding: 10,
		borderRadius: 4,
	},
});
