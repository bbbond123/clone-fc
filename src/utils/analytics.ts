import { AnalyticsEvent } from '@/types'

/**
 * Track user events with Plausible or console in development
 * @param event The analytics event to track
 */
export const trackEvent = (event: AnalyticsEvent): void => {
  if (import.meta.env.PROD) {
    // In production, use Plausible (or any other analytics provider)
    window.plausible?.('User Action', { props: event })
  } else {
    // In development, log to console
    console.log('Analytics:', event)
  }
}

// Declare the Plausible interface for TypeScript
declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options: { props: Record<string, any> }
    ) => void
  }
}
