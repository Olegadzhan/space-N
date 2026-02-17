import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY'
    
    // Получаем фото за последние 7 дней
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - 7)
    
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch NASA photos')
    }
    
    const data = await response.json()
    
    // Фильтруем только фото (не видео)
    const photos = data.filter((item: any) => item.media_type === 'image')
    
    return Response.json({ 
      success: true, 
      photos: photos.map((photo: any) => ({
        id: photo.date,
        title: photo.title,
        url: photo.url,
        hdurl: photo.hdurl,
        explanation: photo.explanation,
        date: photo.date,
        media_type: photo.media_type
      }))
    })
  } catch (error) {
    console.error('NASA API Error:', error)
    
    // Возвращаем демо-данные при ошибке
    return Response.json({ 
      success: false, 
      photos: [
        {
          id: 'demo1',
          title: 'Orion Nebula',
          url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800',
          hdurl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1600',
          explanation: 'The Orion Nebula is one of the brightest nebulae and is visible to the naked eye.',
          date: '2024-01-01',
          media_type: 'image'
        },
        {
          id: 'demo2',
          title: 'Jupiter and its Moons',
          url: 'https://images.unsplash.com/photo-1534103253830-9f5937d11a57?w=800',
          hdurl: 'https://images.unsplash.com/photo-1534103253830-9f5937d11a57?w=1600',
          explanation: 'Jupiter, the largest planet in our solar system, with its four largest moons.',
          date: '2024-01-02',
          media_type: 'image'
        }
      ]
    })
  }
}
