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
  const [users, setUsers] = useState<IUser[]>([
    {
      id: 294,
      email: 'alex@albon',
      name: 'Alex Albon',
      admin: false,
      renew_password: true,
      role: 2,
      access_token: null,
      tags: ['Vendas', 'Compras', 'Tags'],
      external_code: 'TE',
      phone_area: null,
      phone: null,
      created_at: '2020-09-13T23:25:01.494-03:00',
      updated_at: '2020-09-14T00:01:22.786-03:00'
    },
    {
      id: 269,
      email: 'pedro@vnda.com.br',
      name: 'Pedro',
      admin: false,
      renew_password: true,
      role: 0,
      access_token: null,
      tags: ['Compras', 'Vendas'],
      external_code: 'GRA',
      phone_area: null,
      phone: null,
      created_at: '2020-09-09T01:23:17.087-03:00',
      updated_at: '2020-09-09T01:23:17.096-03:00'
    },
    {
      id: 206,
      email: 'joice@vnda.com',
      name: 'Joice',
      admin: false,
      renew_password: false,
      role: 0,
      access_token: null,
      tags: ['ceo'],
      external_code: 'POA',
      phone_area: null,
      phone: null,
      created_at: '2019-07-31T16:37:23.253-03:00',
      updated_at: '2019-07-31T16:37:23.253-03:00'
    },
    {
      id: 205,
      email: 'Bobert@vnda.com',
      name: 'Boberto',
      admin: false,
      renew_password: false,
      role: 0,
      access_token: null,
      tags: ['ceo'],
      external_code: 'POA',
      phone_area: null,
      phone: null,
      created_at: '2019-07-31T16:36:55.937-03:00',
      updated_at: '2019-07-31T16:36:55.937-03:00'
    }
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalUserData, setModalUserData] = useState<IUser>()
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

  // Gets the data from API, because of CORS problems this is not working
  useEffect(() => {
    ;(async () => {
      let response = await fetch('https://demo.vnda.com.br/api/v2/users', {
        method: 'GET',
        headers: {
          Authorization: `Token token=${process.env.REACT_APP_API_TOKEN}`
        }
      })
      let parsedResponse = await response.json()
      setUsers(parsedResponse)
    })()
  }, [])

  async function updateUser() {
    // Para realizar o fetch(PUT) o cors acusa o mesmo problema com o servidor
    let tags = modalTags.split(',')
    let response = await fetch(
      `https://demo.vnda.com.br/api/v2/users/${modalUserData.id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Token token=${process.env.REACT_APP_API_TOKEN}`
        },
        body: JSON.stringify({
          email: modalEmail,
          name: modalName,
          role: modalRole,
          tags: tags,
          external_code: modalExternalCode
        })
      }
    )
    alert('Usuario Atualizado')
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
