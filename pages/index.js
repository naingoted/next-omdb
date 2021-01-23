import Head from 'next/head';
import Movies from '../components/Movies/Movies';

export default function Home() {
  return (
    <>
      <Head>
        <title>Movies Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Movies />
    </>
  )
}
