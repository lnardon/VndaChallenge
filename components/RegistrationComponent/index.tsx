import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    backgroundColor: '#a6d5a4'
  }
}))

const RegistrationComponent: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div></div>
    </div>
  )
}

export default RegistrationComponent
