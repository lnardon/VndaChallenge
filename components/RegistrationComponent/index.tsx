import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa'
  },
  table: {
    width: '100%'
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: '3rem',
    fontWeight: 'bold'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '350px'
  }
}))

function createData(name: string, email: string, externalCode: string) {
  return { name, email, externalCode }
}

const rows = [createData('John Jonson', 'john@capital.co.uk', '0045')]

const RegistrationComponent: React.FC = () => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [externalCode, setExternalCode] = useState('')
  const [position, setPosition] = useState(0)
  const [tags, setTags] = useState('')

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(parseInt(event.target.value))
  }

  const sendData = () => {
    let tagsArray = tags.split(',')
    fetch('https://demo.vnda.com.br/api/v2/users', {
      method: 'POST',
      headers: {
        Authorization: `Token token=${process.env.REACT_APP_API_TOKEN}`
      },
      body: JSON.stringify({
        name,
        email,
        external_code: externalCode,
        role: position,
        tags: tagsArray
      })
    })
    alert('Cadastro realizado com sucesso!')
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}> Registro </h1>
      <div className={classes.form}>
        <TextField
          label="Nome Completo"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <br />
        <TextField
          label="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <br />
        <TextField
          label="Código externo"
          value={externalCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setExternalCode(e.target.value)
          }
        />
        <br />
        <Select
          id="demo-simple-select"
          value={position}
          onChange={handleSelectChange}
        >
          <MenuItem value={0}>{'Agente'}</MenuItem>
          <MenuItem value={1}>{'Gestor'}</MenuItem>
          <MenuItem value={2}>{'Local'}</MenuItem>
        </Select>
        <br />
        <TextField
          id="standard-error-helper-text"
          label="Tags"
          value={tags}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTags(e.target.value)
          }
        />
        <br />
        <Button variant="contained" color="primary" onClick={sendData}>
          Cadastrar
        </Button>
      </div>
    </div>
  )
}

export default RegistrationComponent
