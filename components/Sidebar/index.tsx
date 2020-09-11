import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  sidebarContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
    height: '100vh',
    backgroundColor: '#e1e1e1'
  }
}))

const Sidebar: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.sidebarContainer}>
      <div></div>
    </div>
  )
}

export default Sidebar
