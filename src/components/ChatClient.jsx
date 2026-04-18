'use client'
import { useState } from 'react'

export default function ChatClient(){
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function sendMessage(e){
    e.preventDefault()
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try{
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })
      if (!res.ok) throw new Error('Network error')
      const data = await res.json()
      const aiText = data?.text || '[ไม่มีการตอบกลับ]'
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }])
    }catch(err){
      setMessages(prev => [...prev, { role: 'assistant', content: 'เกิดข้อผิดพลาด: ' + String(err) }])
    }finally{
      setLoading(false)
    }
  }

  return (
    <div style={{maxWidth:800}}>
      <div style={{border:'1px solid #ddd',padding:12,minHeight:240,background:'#fafafa'}}>
        {messages.length===0 && <p style={{color:'#666'}}>ยังไม่มีข้อความ — ลองทักทาย AI</p>}
        {messages.map((m, i) => (
          <div key={i} style={{marginBottom:8}}>
            <strong style={{textTransform:'capitalize'}}>{m.role}:</strong>
            <div style={{marginTop:4,whiteSpace:'pre-wrap'}}>{m.content}</div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={{marginTop:12,display:'flex',gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="พิมพ์ข้อความ..." style={{flex:1,padding:8}} />
        <button type="submit" disabled={loading} style={{padding:'8px 12px'}}>{loading? 'กำลังส่ง...' : 'ส่ง'}</button>
      </form>
    </div>
  )
}
