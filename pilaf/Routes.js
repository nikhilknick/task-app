import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, setAuthFalse } from './features/User/UserSlice';
import Dashboard from './screens/Dashboard';
import HomeScreen from './screens/HomeScreen';

const Routes = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(selectAuth);
	const Stack = createNativeStackNavigator();

	useEffect(() => {
		const getToken = async () => {
			const token = await AsyncStorage.getItem('token');
			if (!token) {
				//SET isAuthenticated to true
				dispatch(setAuthFalse());
			}
		};
		getToken();
	}, []);

	return (
		<NavigationContainer>
			<SafeAreaProvider>
				<Stack.Navigator>
					{isAuthenticated ? (
						<Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
					) : (
						<Stack.Screen
							name="HomeScreen"
							component={HomeScreen}
							options={{ headerShown: false }}
						/>
					)}
				</Stack.Navigator>
			</SafeAreaProvider>
		</NavigationContainer>
	);
};

export default Routes;

const styles = StyleSheet.create({});
