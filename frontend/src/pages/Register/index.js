import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'
import logo from '../../assets/logo.svg'

import api from '../../services/api'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  const history = useHistory()

  function handleRegister(e) {
    e.preventDefault()

    api.post('ongs', {name,email,whatsapp,city,state})
      .then(resp => {
        alert(`Seu ID de acesso é: ${resp.data.id}`)
        history.push('/')
      })
      .catch((e) => console.log(e))
  }


  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be The Hero"/>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude 
            pessoas a encontrarem os casos da sua ONG</p>

          <Link to="/" className="back-link">
            <FiArrowLeft size="16" color="#E02041"/>
            Voltar para o login
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="Nome da ONG"/>

          <input type="text" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="E-mail"/>

          <input type="text" 
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)} 
            placeholder="Whatsapp"/>

          <div className="input-group">
            <input type="text" 
              value={city} 
              onChange={e => setCity(e.target.value)} 
              placeholder="Cidade"/>

            <input type="text" 
              value={state} 
              onChange={e => setState(e.target.value)} 
              placeholder="UF" style={{width: 80}}/>

          </div>
          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}