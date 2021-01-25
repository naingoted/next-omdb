import Head from 'next/head';
import Movies from '../components/Movies/Movies';
import { MovieProvider } from '../contexts/moviesContext';

export default function Home() {
  return (
    <MovieProvider>
      <Head>
        <title>Movies Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Movies />
    </MovieProvider>
  )
}
