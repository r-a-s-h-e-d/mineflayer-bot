import Head from 'next/head'

export default function Home() {
	const startServer = () => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: 'React POST Request Example' }),
		}
		fetch('/api/server', requestOptions)
			.then(res => res.json())
			.then(data => console.log(data))
	}
	return (
		<>
			<Head>
				<title>MineFlayer Bot</title>
				<meta name='description' content='Made by Rashed Ahmed' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div>
				<button onClick={startServer}>Start</button>
			</div>
		</>
	)
}
