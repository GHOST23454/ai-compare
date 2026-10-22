import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          {
            role: 'system',
            content: 'Sen AI Compare sitesinin yardımcı asistanısın. Kullanıcılara yapay zeka araçları (ChatGPT, Midjourney, Cursor vb.) hakkında bilgi verirsin. Kısa, samimi ve yardımcı cevaplar ver. Kullanıcı hangi dilde yazarsa o dilde cevap ver.'
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Groq Detaylı Hata:', JSON.stringify(errorData, null, 2));
      return NextResponse.json({ 
        error: 'Groq API hatası', 
        details: errorData 
      }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ text: data.choices[0].message.content });

  } catch (error: any) {
    console.error('API Hatası:', error);
    return NextResponse.json({ error: 'Bir hata oluştu', details: error.message }, { status: 500 });
  }
}