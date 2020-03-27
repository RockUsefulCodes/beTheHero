import React, {useState} from 'react'
import './styles.css'
import heroesImg from '../../assets/heroes.png'
import logo from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'

export default function Login() {
  const [id, setId] = useState('')

  const history = useHistory()

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const resp = await api.post('session', {id})

      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', resp.data.name)

      history.push('/profile')
    } catch (error) {
      alert('Falha no login tente novamente')
    }
  }


  return (
    <div className="login-container">
      <section className="form">
        <img src={logo} alt="Heroes" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>

          <input type="text" 
            value={id} 
            onChange={e => setId(e.target.value)} 
            placeholder="Sua ID" />

          <button className="button" type="submit">Entrar</button>
          
          <Link to="/register" className="back-link">
            <FiLogIn size="16" color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  )
}