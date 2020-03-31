import React, { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import api from '../../services/api'
import './styles.css'

export default function NewIncident() {
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')
  const [id, setId] = useState()
  const ongId = localStorage.getItem('ongId')

  useEffect(() => {
    const state = history.location.state
    if (state) {
      setTitle(state.title)
      setDescription(state.description)
      setValue(state.value)
      setId(state.id)
    }
  }, [history.location.state])

  async function handleRegister(e) {
    e.preventDefault()
    try {
      const data = { title, description, value }
      const headers = {
        headers: {
          Authorization: ongId
        }
      }

      if (id) {
        await api.put(`incidents/${id}`, data, headers)
      } else {
        await api.post('incidents', data, headers)
      }

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
          <h1>{id ? 'Atualizar caso' : 'Cadastro novo caso'}</h1>
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
          <button type="submit" className="button">{id ? 'Atualizar' : 'Cadastrar'}</button>
        </form>
      </div>
    </div>
  )
}