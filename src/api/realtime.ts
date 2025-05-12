export const mockRealtimeDrops = (
  callback: (drops: { user: string; skin: string }[]) => void
) => {
  const drops = [
    { user: 'User1', skin: 'AK-47 | Neon' },
    { user: 'User2', skin: 'M4A4 | Asiimov' },
    { user: 'User3', skin: 'AWP | Dragon Lore' },
    { user: 'User4', skin: 'Butterfly Knife | Fade' },
  ]
  let queue: { user: string; skin: string }[] = []
  const interval = setInterval(() => {
    queue.push(drops[Math.floor(Math.random() * drops.length)])
    if (queue.length >= 3) {
      callback(queue)
      queue = []
    }
  }, 3000) // Reduced frequency for better performance
  return () => clearInterval(interval)
}

export const connectWebSocket = (
  callback: (drop: { user: string; skin: string }) => void
) => {
  const ws = new WebSocket(import.meta.env.VITE_WS_URL)
  ws.onmessage = (event) => {
    const drop = JSON.parse(event.data)
    callback(drop)
  }
  return ws
} 