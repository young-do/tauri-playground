import { useState } from 'react'
import { Command, open } from '@tauri-apps/api/shell';
import './App.css'


function App() {
  const [domain, setDomain] = useState('')
  const [port, setPort] = useState('')
  const [stdout, setStdout] = useState('')
  const [udp, setUdp] = useState(false) 

  const testCommand = async () => {
    // open('https://github.com/tauri-apps/tauri')

    // @note: udp 체크는 super user 권한으로만 체크 가능...
    // const cmd = new Command('nmap', [`${udp ? '-sU' : ''} -p ${port}`, domain])
    const cmd = new Command('nmap', [`-p ${port}`, domain])
    const output = await cmd.execute()
    console.log(output)
    setStdout(output.stdout)
  }

  return (
    <div className="App">
      <div>
        <input type="text" value={domain} onChange={e => setDomain(e.target.value)} placeholder="Enter domain or ip" autoCapitalize='false'/>
        <br/>
        <input type="text" value={port} onChange={e => setPort(e.target.value)} placeholder="Enter port" autoCapitalize='false' />
        {/* <br/>
        UDP: <input type="checkbox" checked={udp} onChange={e => setUdp(e.target.checked)} /> */}
      </div>
      <div>
        <button onClick={testCommand}>
          run nmap
        </button>
      </div>
      <textarea value={stdout} readOnly></textarea>
    </div>
  )
}

export default App
