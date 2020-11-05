import React from 'react'

import useIntervalValue from 'use-interval-value'

const getCurrentTime = () => new Date().toString().slice(16, 24);

const App = () => {
  const [paused, setPaused] = React.useState(false);
  const example = useIntervalValue(1e3, getCurrentTime, paused);

  return (
    <div>
      {example}
      {' '}
      <button onClick={() => setPaused(!paused)}>{paused ? 'continue' : 'pause'}</button>
    </div>
  )
}
export default App
