import Head from 'next/head';
import Signup from '../features/User/Signup';
import Header from '../components/Header';

export default function Home() {
	return (
		<div>
			<Head>
				<title className="">Task App</title>
				<meta name="description" content="Task app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Signup />
			</main>

			<footer>Footer</footer>
		</div>
	);
}
