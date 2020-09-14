import React, { useState } from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'

import Sidebar from '../components/Sidebar'
import ListComponent from '../components/ListComponent'
import RegistrationComponent from '../components/RegistrationComponent'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh'
  }
}))

const Home: React.FC = () => {
  const classes = useStyles()
  const [currentComponent, setCurrentComponent] = useState(<ListComponent />)

  function changeCurrentComponent(label: string) {
    switch (label) {
      case 'Listagem':
        setCurrentComponent(<ListComponent />)
        return
      case 'Registro':
        setCurrentComponent(<RegistrationComponent />)
        return
      default:
        setCurrentComponent(<ListComponent />)
    }
  }
  return (
    <>
      <Head>
        <title>Typescript Next App</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="stylesheet" href="../static/styles.css" />
      </Head>
      <div className={classes.container}>
        <Sidebar handleSelection={changeCurrentComponent} />
        {currentComponent}
      </div>
    </>
  )
}

export default Home
