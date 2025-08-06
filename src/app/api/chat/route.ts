import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    const { messages, query } = await request.json()
    
    if (!query && !messages) {
      return NextResponse.json({ error: 'Query or messages are required' }, { status: 400 })
    }

    const zai = await ZAI.create()
    
    // Prepare conversation messages
    const conversationMessages = messages || [
      {
        role: 'system',
        content: 'You are a helpful AI assistant for Homie, India\'s first zero-commission homestay booking platform. Help users find perfect homestays, answer questions about Indian travel, and provide recommendations about properties, locations, and travel tips. Be friendly, knowledgeable about Indian culture and hospitality, and always prioritize user safety and authentic experiences.'
      },
      {
        role: 'user',
        content: query || 'Hello, I need help finding a homestay in India.'
      }
    ]

    // Get AI completion
    const completion = await zai.chat.completions.create({
      messages: conversationMessages,
      temperature: 0.7,
      max_tokens: 500
    })

    const response = completion.choices[0]?.message?.content || 'I apologize, but I\'m having trouble responding right now. Please try again.'

    return NextResponse.json({ 
      response,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error.message 
    }, { status: 500 })
  }
}