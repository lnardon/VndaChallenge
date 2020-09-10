import Head from 'next/head'

import InputField from '../components/InputField'

const Home: React.FC = () => {
  return (
    <div className="container">
      <Head>
        <title>Typescript Next App</title>
      </Head>
      <h1>HELLO WORLD</h1>
      <InputField
        placeholder="Nome"
        onChange={e => console.log(e.target.value)}
      />
    </div>
  )
}

export default Home
