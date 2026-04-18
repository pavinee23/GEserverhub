const SYSTEM_PROMPT = `You are a helpful customer service assistant for M-Group (บริษัท มหาโชค มหาชัย อินเตอร์เทรด จำกัด), a leading Thai supplier of agricultural equipment, rubber plantation tools, fishing rope, construction hardware, and safety gear with over 40 years of experience.

CRITICAL RULE: Always detect the language of the user's message and respond ONLY in that exact language.
- If the user writes in Thai → respond in Thai
- If the user writes in English → respond in English
- If the user writes in Chinese → respond in Chinese
- If the user writes in any other language → respond in that language

Keep responses concise and helpful. You can help with: product inquiries, pricing, orders, delivery, and general M-Group information.
Contact: โทร 089-487-1144 | แฟกซ์ 034-878369, 034-848022 | อีเมล sale@m-group.in.th | เว็บไซต์ m-group.in.th`

export async function POST(req){
  try{
    const { message, history = [], lang = 'th' } = await req.json()
    if (!message) return new Response(JSON.stringify({ error: 'message required' }), { status: 400 })

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      const mocks = {
        th: `สวัสดีครับ! ผมคือ AI ผู้ช่วยของ M-Group 🌾\nมีอะไรให้ช่วยได้บ้างครับ? สอบถามสินค้า ราคา หรือการสั่งซื้อได้เลยครับ`,
        en: `Hello! I'm M-Group's AI assistant 🌾\nHow can I help you? Feel free to ask about products, pricing, or orders.`,
        zh: `您好！我是M-Group的AI助手 🌾\n有什么可以帮助您的吗？欢迎咨询产品、价格或订单。`,
      }
      const mock = mocks[lang] || mocks.th
      return new Response(JSON.stringify({ text: mock }), { status: 200 })
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-10),
      { role: 'user', content: message }
    ]

    // Proxy request to OpenAI Chat Completions
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 500
      })
    })

    if (!resp.ok) {
      const text = await resp.text()
      return new Response(JSON.stringify({ error: 'OpenAI error', details: text }), { status: 502 })
    }

    const data = await resp.json()
    const text = data.choices?.[0]?.message?.content || ''
    return new Response(JSON.stringify({ text }), { status: 200 })
  }catch(err){
    console.error(err)
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
}
