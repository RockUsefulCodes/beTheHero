import React, { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import api from '../../services/api'
import './styles.css'



export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const ongId = localStorage.getItem('ongId')
  const history = useHistory()

  useEffect(() => {
    if (ongId) {
      api.get(`/ongs/${ongId}`)
        .then(({data: ong}) => {
          setName(ong.name)
          setEmail(ong.email)
          setWhatsapp(ong.whatsapp)
          setCity(ong.city)
          setState(ong.state)
        })
        .catch(error => {
          console.error(error);
        })
    }
  }, [ongId])

  function handleRegister(e) {
    e.preventDefault()
    
    const body = { name, email, whatsapp, city, state }

    if (ongId) {
      updateOng(body)
    } else {
      createOng(body)
    }

    function updateOng(body) {
      api.put(`/ongs/${ongId}`, body)
        .then(resp => {
          history.goBack()
        })
    }

    function createOng(body) {
      api.post('ongs', body)
        .then(resp => {
          alert(`Seu ID de acesso é: ${resp.data.id}`)
          history.push('/')
        })
        .catch((e) => console.log(e))
    }
  }


  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be The Hero"/>
          <h1>{ongId ? 'Atualizar ONG' : 'Cadastro'}</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude 
            pessoas a encontrarem os casos da sua ONG</p>

          <Link to={ongId ? "/profile" : "/"} className="back-link">
            <FiArrowLeft size="16" color="#E02041"/>
            Voltar para o {ongId ? 'profile' : 'login'}
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
          <button type="submit" className="button">{ongId ? 'Atualizar' : 'Cadastrar'}</button>
        </form>
      </div>
    </div>
  )
}