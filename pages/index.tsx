import React from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'

import Sidebar from '../components/Sidebar'
import ListComponent from '../components/ListComponent'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh'
  }
}))

const Home: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Head>
        <title>Typescript Next App</title>
        <link rel="stylesheet" href="../static/styles.css" />
      </Head>
      <Sidebar />
      <ListComponent />
    </div>
  )
}

export default Home
