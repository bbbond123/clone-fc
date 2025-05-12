import { User } from '@/types'

/**
 * Mock function to simulate Steam login
 * In a real app, this would redirect to Steam's OpenID login page
 * and handle the callback with token validation
 */
export const loginWithSteam = async (): Promise<User> => {
  // Simulate network delay
  const delay = 800 + Math.random() * 500

  return new Promise((resolve) => {
    // Show a fake Steam login window
    const steamWindow = window.open(
      '',
      'SteamLogin',
      'width=800,height=600,status=yes,scrollbars=yes'
    )

    if (steamWindow) {
      // Add some basic content
      steamWindow.document.write(`
        <html>
          <head>
            <title>Steam Login</title>
            <style>
              body { font-family: Arial; background: #1b2838; color: white; padding: 20px; }
              input { padding: 8px; width: 100%; margin: 5px 0; }
              button { background: #66c0f4; border: none; padding: 10px; width: 100%; color: #000; cursor: pointer; }
            </style>
          </head>
          <body>
            <h2>Steam Login</h2>
            <div>
              <label>Username</label>
              <input type="text" value="user123" />
              <label>Password</label>
              <input type="password" value="*********" />
              <button id="loginBtn">Login</button>
            </div>
            <script>
              document.getElementById('loginBtn').addEventListener('click', function() {
                window.close();
              });
              // Auto-close after 3 seconds for demo
              setTimeout(() => window.close(), 3000);
            </script>
          </body>
        </html>
      `)
    }

    // Simulate successful login after delay
    setTimeout(() => {
      if (steamWindow && !steamWindow.closed) {
        steamWindow.close()
      }

      resolve({
        id: 'steam_123456',
        username: 'FlameCase_Player',
        avatar: '/images/avatars/default.png',
        inventory: [],
        balance: 100.0,
      })
    }, delay)
  })
}

/**
 * Check if user is logged in
 * In real app, this would verify the session token
 */
export const checkAuth = (): boolean => {
  const user = localStorage.getItem('user')
  return !!user
}

/**
 * Log out the current user
 */
export const logout = (): void => {
  localStorage.removeItem('user')
}
