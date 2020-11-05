import React from 'react'

import useIntervalValue from 'use-interval-value'

const App = () => {
  const [paused, setPaused] = React.useState(false);
  const example = useIntervalValue(1e3, () => new Date().toString().slice(16, 24), paused);

  return (
    <div>
      {example}
      {' '}
      <button onClick={() => setPaused(!paused)}>{paused ? 'continue' : 'pause'}</button>
    </div>
  )
}
export default App
