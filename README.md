# use-interval-value

> Generate new values at intervals

[![NPM](https://img.shields.io/npm/v/use-interval-value.svg)](https://www.npmjs.com/package/use-interval-value) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install use-interval-value
```

## Usage

```tsx
import * as React from 'react'

import useIntervalValue from 'use-interval-value'

const getCurrentTime = () => new Date().toString().slice(16, 24)

export const Time = () => {
  const time = useIntervalValue(1000, getCurrentTime)
  return <div>{time}</div>
}
```

### With mutable callback

```tsx
import * as React from 'react'

import useIntervalValue, { IntervalCallback } from 'use-interval-value'

const second = 1e3
const minute = second * 60
const hour = minute * 60

const formatTimeLeft = (msLeft: number) => {
  const hours = Math.floor(msLeft / hour).toString().padStart(2, '0')
  const minutes = Math.floor((msLeft % hour) / minute).toString().padStart(2, '0')
  const seconds = Math.ceil((msLeft % minute) / second).toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

export const Countdown = ({ endTimestamp }: { endTimestamp: number }) => {
  const getTimeLeft = React.useCallback<IntervalCallback<string>>(
    clear => {
      const timeLeft = endTimestamp - Date.now()
      if (timeLeft <= 0) clear()
      return formatTimeLeft(timeLeft < 0 ? 0 : timeLeft)
    },
    [endTimestamp]
  )

  const time = useIntervalValue(1000, getTimeLeft)

  return <div>{time}</div>
}

Countdown.defaultProps = {
  endTimestamp: Date.now() + 1e4,
}
```

## License

MIT © [termosa](https://github.com/termosa)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
