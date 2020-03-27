import React from 'react'

export default function Header({ title, children }) {
  return (
    <header>
      <h1>BE THE HERO <small>{title}</small></h1>
      <p>{children}</p>
    </header>
  )
}