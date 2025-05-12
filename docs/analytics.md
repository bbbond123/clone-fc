# Analytics Event Map

## Events
| Action           | Props                      | Description                     |
|------------------|----------------------------|---------------------------------|
| open-case        | caseId: string            | User opens a case               |
| login            | method: 'steam'           | User logs in via Steam          |
| switch-language  | language: 'zh'\|'en'\|'ja'| User changes language           |
| view-inventory   | -                         | User views inventory            |

## Implementation
Events are tracked using the `trackEvent` utility in `src/utils/analytics.ts`:

```ts
import { trackEvent } from '@/utils/analytics'

// Example usage
trackEvent({ action: 'open-case', caseId: '1' })
trackEvent({ action: 'login', method: 'steam' })
trackEvent({ action: 'switch-language', language: 'en' })
trackEvent({ action: 'view-inventory' })
```

In production, events are sent to Plausible Analytics:
```ts
window.plausible('User Action', { props })
```

In development, events are logged to the console for debugging:
```ts
console.log('Analytics:', event)
```

## Key Metrics
We track the following key metrics to understand user behavior:

### Case Popularity
- Track which cases are opened most frequently
- Data source: `open-case` events with `caseId`
- Goal: Identify most popular cases to prioritize content

### User Engagement
- Track login frequency and session duration
- Data source: `login` events and page view durations
- Goal: Increase user retention and engagement

### Language Preference
- Track which languages are most commonly used
- Data source: `switch-language` events with `language`
- Goal: Prioritize localization efforts

## Data Privacy
All analytics are anonymized and comply with GDPR regulations:
- No personal identifiable information (PII) is collected
- Users can opt-out via cookie preferences
- Data retention period is limited to 12 months 