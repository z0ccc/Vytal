import React, { useState, useEffect } from 'react'
import profiles from '../../utils/profiles'

const DebugSettings = ({ type, title, ip, profile, setProfile }) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (profile === 'match') {
      console.log(ip)
      if (ip) {
        setValue(ip[type])
        chrome.storage.sync.set({ [type]: ip[type] })
      }
    } else if (profile === 'custom') {
      console.log(111)
      chrome.storage.sync.get([type], (result) => {
        result[type] && setValue(result[type])
      })
    } else {
      setValue(profiles[profile][type])
      chrome.storage.sync.set({ [type]: profiles[profile][type] })
    }
  }, [ip, profile, type])

  const changeTextValue = (e) => {
    chrome.storage.sync.set({ [type]: e.target.value })
    setValue(e.target.value)
    chrome.storage.sync.set({ profile: 'custom' })
    setProfile('custom')
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '12px 0 0 0',
      }}
    >
      <input
        type="text"
        value={value}
        onChange={changeTextValue}
        style={{
          width: '168px',
        }}
      />
      <label>{title}</label>
      {/* <label>
        <input type="checkbox" checked={matchIP} onChange={toggleMatchIP} />
        Match IP
      </label> */}
    </div>
  )
}

export default DebugSettings