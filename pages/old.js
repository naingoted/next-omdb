import Head from 'next/head';
import Movies from '../components/Movies/Movies';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div data-testid="app">
      <Head>
        <title>Movies Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        asdf{process.env.NEXT_PUBLIC_ENV_VARIABLE}
        <Movies />
      </main>
    </div>
  )
}
