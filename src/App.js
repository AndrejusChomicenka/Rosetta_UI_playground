import React, { useState } from 'react'
import ReactJson from 'react-json-view'
import './App.css';

// OPTIONS TO DISPLAY JSON:
// 1. JSON.stringify() pretty-printing that is implemented natively
//  PROBLEM: Can't yet seem to make it work as expected in react environment :(
// 2. Display as text in iframe and let json viewer browser extention do the job
//  PROBLEM: Would require everyone to use the extention that works with this solution, also managing iframes through css/js is a pain (to make iframe's height === to it's content's height)
// 3. Use 'react-json-view' component
//  PROBLEM: Works and looks very well, but larger JSONs seem to slow browsers down.

function App() {

  const [callProd, setCallProd] = useState('')
  const [callStg, setCallStg] = useState('')
  const [client, setClient] = useState('')

  // const [prodIframe, setProdIframe] = useState('')
  // const [stgIframe, setstgIframe] = useState('')

  const [dc, setDc] = useState('')
  const [requestKey, setRequestKey] = useState('')

  const callHandler = async (e) => {
    e.preventDefault()
    const getResponseProd = async () => {
      const resProd = await fetch(
        `https://rosetta.prod.us-east-1.nexus.bazaarvoice.com/package/1/client/${client}`
      )
      const dataProd = await resProd.json()
      setCallProd(dataProd)
    }
    
    const getResponseStg = async () => {
      const resStg = await fetch(
        `https://rosetta-stg.prod.us-east-1.nexus.bazaarvoice.com/package/1/client/${client}`
        )
      const dataStg = await resStg.json()
      setCallStg(dataStg)
    }
      
    const getAll = async () => {
      await getResponseProd()      
      await getResponseStg()
    }
    
    getAll()
    
    // setProdIframe(`https://rosetta.prod.us-east-1.nexus.bazaarvoice.com/package/1/client/${client}`)
    // setstgIframe(`https://rosetta-stg.prod.us-east-1.nexus.bazaarvoice.com/package/1/client/${client}`)
  }

  const callHandler2 = async (e) => {
    e.preventDefault()
    const getResponseProd = async () => {
      const resProd = await fetch(
        `https://rosetta.prod.us-east-1.nexus.bazaarvoice.com/scan/2/site/${dc}/prr?key=${requestKey}`
      )
      const dataProd = await resProd.json()
      setCallProd(dataProd)
    }
    
    const getResponseStg = async () => {
      const resStg = await fetch(
        `https://rosetta-stg.prod.us-east-1.nexus.bazaarvoice.com/scan/2/site/${dc}/prr?key=${requestKey}`
        )
      const dataStg = await resStg.json()
      setCallStg(dataStg)
    }
      
    const getAll = async () => {
      await getResponseProd()      
      await getResponseStg()
    }

    getAll()

    // setProdIframe(`https://rosetta.prod.us-east-1.nexus.bazaarvoice.com/scan/2/site/${dc}/prr?key=${requestKey}`)
    // setstgIframe(`https://rosetta-stg.prod.us-east-1.nexus.bazaarvoice.com/scan/2/site/${dc}/prr?key=${requestKey}`)
  }

  return (
    <div className="App">
        <nav>
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
          <div className='column-names'>
            <h3>PROD</h3>
            <h3>STG</h3>
          </div>
        </nav>
      <div className='container'>
        <div className='prod'>
          <ReactJson
            displayDataTypes={false} 
            displayObjectSize={false} 
            enableClipboard={false} 
            displayArrayKey={false} 
            quotesOnKeys={false} 
            groupArraysAfterLength={false} 
            collapseStringsAfterLength={40} 
            src={callProd} />
          {/* <div><pre>{JSON.stringify(callProd, undefined, 2)}</pre></div> */}
          {/* <iframe id='myIframe' src={prodIframe} title='prod'></iframe> */}
        </div>
        <div className='stg'>
          <ReactJson 
            displayDataTypes={false} 
            displayObjectSize={false} 
            enableClipboard={false} 
            displayArrayKey={false} 
            quotesOnKeys={false} 
            groupArraysAfterLength={false} 
            collapseStringsAfterLength={40} 
            src={callStg} />
          {/* <iframe src={stgIframe} title='stg'></iframe> */}
        </div>
      </div>
    </div>
  );
}

export default App;
