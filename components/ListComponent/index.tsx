import React, { useState, useEffect, ChangeEvent } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import fetch from 'isomorphic-unfetch'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
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
  tableHeader: {
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  modal: {
    position: 'absolute',
    transform: 'translate(-50%,-50%)',
    top: '50%',
    left: '50%',
    backgroundColor: '#fafafa',
    border: '3px solid #303F9F',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none'
  },
  modalInput: {
    borderColor: '#fafafa'
  }
}))

interface IUser {
  id: number
  email: string
  name: string
  admin: boolean
  renew_password: boolean
  role: number
  access_token: null
  tags: string[]
  external_code: string
  phone_area: null
  phone: null
  created_at: string
  updated_at: string
}

const ListComponent: React.FC = () => {
  const classes = useStyles()
  const [users, setUsers] = useState<IUser[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalUserData, setModalUserData] = useState<IUser>(null)
  const [modalName, setModalName] = useState('')
  const [modalEmail, setModalEmail] = useState('')
  const [modalRole, setModalRole] = useState(0)
  const [modalTags, setModalTags] = useState('')
  const [modalExternalCode, setModalExternalCode] = useState('')
  const modalBody = (
    <div className={classes.modal}>
      <TextField
        label="Nome Completo"
        value={modalName}
        className={classes.modalInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setModalName(e.target.value)
        }}
      />
      <br />
      <TextField
        label="Email"
        value={modalEmail}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setModalEmail(e.target.value)
        }
      />
      <br />
      <TextField
        label="Código externo"
        value={modalExternalCode}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setModalExternalCode(e.target.value)
        }
      />
      <br />
      <Select
        id="demo-simple-select"
        value={modalRole}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          changeModalRole(parseInt(e.target.value))
        }
      >
        <MenuItem value={0}>{'Agente'}</MenuItem>
        <MenuItem value={1}>{'Gestor'}</MenuItem>
        <MenuItem value={2}>{'Local'}</MenuItem>
      </Select>
      <br />
      <TextField
        id="standard-error-helper-text"
        label="Tags"
        value={modalTags}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setModalTags(e.target.value)
        }
      />
      <br />
      <Button variant="contained" color="primary" onClick={updateUser}>
        Atualizar
      </Button>
    </div>
  )

  useEffect(() => {
    ;(async () => {
      let response = await fetch('http://localhost:8888/getUsers')
      let parsedResponse = await response.json()
      setUsers(parsedResponse)
    })()
  }, [])

  async function updateUser() {
    let tags = modalTags.split(',')
    let response = await fetch('http://localhost:8888/updateUser', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: modalUserData.id,
        name: modalName,
        email: modalEmail,
        external_code: modalExternalCode,
        role: modalRole
      })
    })
    if (response.status === 200) {
      alert('Usuario Atualizado')
    } else {
      alert('Erro ao atualizar usuario')
    }
    setIsModalOpen(!isModalOpen)
  }

  function openUserModal(user: IUser) {
    setIsModalOpen(true)
    setModalUserData(user)
    setModalName(user.name)
    setModalEmail(user.email)
    setModalExternalCode(user.external_code)
    setModalRole(user.role)
    setModalTags(user.tags.join(','))
  }

  function changeModalRole(role: number) {
    setModalRole(role)
  }

  return (
    <div className={classes.container}>
      <div>
        <h1 className={classes.title}>Listagem</h1>
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(!isModalOpen)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {modalBody}
        </Modal>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeader}>
                  Nome Completo
                </TableCell>
                <TableCell className={classes.tableHeader}>Email</TableCell>
                <TableCell className={classes.tableHeader}>
                  Código externo
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.name}>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.external_code}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => openUserModal(user)}
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default ListComponent
