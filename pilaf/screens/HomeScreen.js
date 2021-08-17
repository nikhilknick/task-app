import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Signin from '../components/Signin';
import Signup from '../components/Signup';

const HomeScreen = () => {
	const [signPage, setSignPage] = useState('Signin');

	const toggleSignPage = (value) => {
		setSignPage(value);
	};

	return (
		<View>
			<View style={tw`h-1/2 bg-white justify-center items-center`}>
				<Text style={tw`mt-20 pt-10 font-bold text-xl text-black`}>TASK APP</Text>
				<Image
					source={require('../assets/signscreen.png')}
					style={{ width: 500, height: 500, resizeMode: 'contain' }}
				/>
			</View>
			<View style={tw`h-1/2 bg-white`}>
				{signPage === 'Signin' ? (
					<Signin toggleSignPage={toggleSignPage} signPage={signPage} />
				) : (
					<Signup toggleSignPage={toggleSignPage} signPage={signPage} />
				)}
			</View>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
