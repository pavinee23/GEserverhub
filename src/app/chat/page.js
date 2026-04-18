import ChatClient from '@/components/ChatClient'

export const metadata = {
  title: 'AI Chat',
  description: 'แชตกับ AI - Han'
}

export default function ChatPage(){
  return (
    <main style={{padding:'20px'}}>
      <h1>แชตกับ AI</h1>
      <p>พิมพ์คำถามหรือข้อความแล้วกดส่ง</p>
      <ChatClient />
    </main>
  )
}
