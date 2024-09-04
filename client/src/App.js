import React from 'react'
import Header from './components/Header/Header'
import Form from './components/Form/Form'
import ItemList from './components/ItemList/ItemList'
import './styles/App.css'
function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Form />
        <ItemList />
      </main>
    </div>
  )
}

export default App
