import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'

const useStyles = makeStyles(theme => ({
  sidebarContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
    height: '100vh',
    backgroundColor: '#303F9F'
  },
  optionContainer: {
    width: '100%',
    padding: '0rem 2rem',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: '#303F9F',
    borderBottom: '1px solid #fafafa',
    outline: 'none',
    color: '#fafafa'
  },
  optionTitle: {
    fontSize: '1.25rem'
  }
}))

interface sideProp {
  handleSelection: (label: string) => void
}

const Sidebar: React.FC<sideProp> = ({ handleSelection }) => {
  const classes = useStyles()

  return (
    <div className={classes.sidebarContainer}>
      <button
        className={classes.optionContainer}
        onClick={() => handleSelection('Listagem')}
      >
        <h1 className={classes.optionTitle}>Listagem</h1>
      </button>
      <button
        className={classes.optionContainer}
        onClick={() => handleSelection('Registro')}
      >
        <h1 className={classes.optionTitle}>Registro</h1>
      </button>
    </div>
  )
}

export default Sidebar
