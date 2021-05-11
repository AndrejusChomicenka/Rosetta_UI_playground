import React, { useState } from 'react'
import './App.css';

function App() {

  const [callProd, setCallProd] = useState('')
  const [callStg, setCallStg] = useState('')
  const [client, setClient] = useState('')

  const [dc, setDc] = useState('')
  const [requestKey, setRequestKey] = useState('')

  const callHandler = async (e) => {
    e.preventDefault()
    const getResponseProd = async () => {
      const resProd = await fetch(
        `https://rosetta.prod.us-east-1.nexus.bazaarvoice.com/package/1/client/${client}`
      )
      const dataProd = await resProd.text()
      setCallProd(dataProd)
    }
    
    const getResponseStg = async () => {
      const resStg = await fetch(
        `https://rosetta-stg.prod.us-east-1.nexus.bazaarvoice.com/package/1/client/${client}`
        )
      const dataStg = await resStg.text()
      setCallStg(dataStg)
    }
      
    const getAll = async () => {
      await getResponseProd()      
      await getResponseStg()
    }

    getAll()
  }

  const callHandler2 = async (e) => {
    e.preventDefault()
    const getResponseProd = async () => {
      const resProd = await fetch(
        `https://rosetta.prod.us-east-1.nexus.bazaarvoice.com/scan/2/site/${dc}/prr?key=${requestKey}`
      )
      const dataProd = await resProd.text()
      setCallProd(dataProd)
    }
    
    const getResponseStg = async () => {
      const resStg = await fetch(
        `https://rosetta-stg.prod.us-east-1.nexus.bazaarvoice.com/scan/2/site/${dc}/prr?key=${requestKey}`
        )
      const dataStg = await resStg.text()
      setCallStg(dataStg)
    }
      
    const getAll = async () => {
      await getResponseProd()      
      await getResponseStg()
    }

    getAll()
  }

  return (
    <div className="App">
      <form>
        <input
          placeholder='Client'
          value={client}
          onChange={(event) => setClient(event.target.value)}
        />
        <button
          type='submit'
          onClick={callHandler}
        >
          CALL
        </button>
      </form>
      <form>
        <input
          placeholder='Display Code'
          value={dc}
          onChange={(event) => setDc(event.target.value)}
        />
        <input
          placeholder='key'
          value={requestKey}
          onChange={(event) => setRequestKey(event.target.value)}
        />
        <button
          type='submit'
          onClick={callHandler2}
        >
          CALL
        </button>
      </form>
      <div className='container'>
        <div className='prod'>
          <h3>PROD</h3>
          {callProd}
        </div>
        <div className='stg'>
          <h3>STG</h3>
          {callStg}
        </div>
      </div>
    </div>
  );
}

export default App;
