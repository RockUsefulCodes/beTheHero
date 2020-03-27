import React, {useEffect, useState} from 'react'

import logo from '../../assets/logo.svg'
import {FiPower, FiTrash2} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'
import './styles.css'

export default function Profile() {
  const ongName = localStorage.getItem('ongName')
  const ongId = localStorage.getItem('ongId')

  const [data, setData] = useState([])
  const history = useHistory()

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(resp => {
      setData(resp.data)
    })
  }, [ongId])

  async function handleDelete(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })

      setData(data.filter(incident => incident.id !== id))
    } catch (error) {
      alert('Não foi possível excluir o caso')
    }
  }

  function handleLogout() {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="Be The Hero"/>
        <span>Bem vinda, {ongName}</span>

        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>

        <button type="button" onClick={handleLogout}>
          <FiPower size="18" color="#E02041" />
        </button>
      </header>

      <section>
        <h1>Casos cadastrados</h1>

        <ul>
          {data.map(incident => (
            <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>
              
              <strong>DESCRIÇÃO:</strong>
              <p>{incident.description}</p>

              <strong>VALOR:</strong>
              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

              <button onClick={() => handleDelete(incident.id)} type="button">
                <FiTrash2 color="#a8a8b3" size="20" />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}