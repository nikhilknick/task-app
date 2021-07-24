import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from '../app/store';
import { persistor } from '../app/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Component {...pageProps} />
			</PersistGate>
		</Provider>
	);
}

export default MyApp;
