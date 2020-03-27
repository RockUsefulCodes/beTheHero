import React, {useState} from 'react'

import './styles.css'

import logo from '../../assets/logo.svg'
import {FiArrowLeft} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'

export default function NewIncident() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')
  const history = useHistory()

  const ongId = localStorage.getItem('ongId')

  async function handleRegister(e) {
    e.preventDefault()
    try {
      await api.post('incidents', { title, description, value }, {
        headers: {
          Authorization: ongId
        }
      })
      history.push('/profile')
    } catch (error) {
      alert('Erro ao salvar caso')
    }
  }
  return (
    <div className="incident-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be The Hero"/>
          <h1>Cadastro novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar 
            um herói para resolver isso.</p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size="16" color="#E02041"/>
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do caso"/>

          <textarea type="text" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição"/>

          <input type="text" 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Valor em reais"/>

          {/* <button className="">Cancelar</button> */}
          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}