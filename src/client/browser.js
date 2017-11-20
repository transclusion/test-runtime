// @flow

import {run} from '@transclusion/runtime-browser'
import style from './root/style.css'
import './components/backNav/style.css'
import './components/nav/style.css'
import './screens/blog/style.css'
import './screens/home/style.css'
import './screens/post/style.css'

const rootElm = document.getElementById(style.root)
const raf = window.requestAnimationFrame

const effects = {
  POST_OPEN (effect, done) {
    const mainElm = document.querySelector(`.${style.main}`)

    if (mainElm) {
      const handleTransitionEnd = () => {
        mainElm.removeEventListener('transitionend', handleTransitionEnd)
        done()
        raf(() => {
          mainElm.classList.remove(`${style.main}--isTransitioning`)
          mainElm.classList.remove(`${style.main}--next`)
        })
      }
      mainElm.addEventListener('transitionend', handleTransitionEnd)
      mainElm.classList.add(`${style.main}--isTransitioning`)
      setTimeout(() => mainElm.classList.add(`${style.main}--next`), 50)
    } else {
      done()
    }
  }
}

function setupPortEffects (ports: any) {
  const effectsSubscription = ports.effect.subscribe(msg => {
    if (msg.type === 'EFFECT') {
      if (effects[msg.effect.type]) {
        effects[msg.effect.type](msg.effect, () => {
          ports.effect.send({type: 'EFFECT_DONE', effect: msg.effect})
        })
      }
    }
  })

  const historySubscription = ports.history.subscribe(msg => {
    if (msg.type === 'PUSH_STATE') {
      history.pushState(msg.state, msg.title, msg.path)
    }
  })

  const handlePopstate = () => {
    ports.history.send({type: 'POP_STATE', path: location.pathname})
  }

  window.addEventListener('popstate', handlePopstate)

  return () => {
    effectsSubscription.unsubscribe()
    historySubscription.unsubscribe()
    window.removeEventListener('popstate', handlePopstate)
  }
}

if (rootElm) {
  const element: any | null = rootElm.firstChild
  const workerUrl = rootElm.getAttribute('data-worker-url')
  const encodedProps = rootElm.getAttribute('data-props')

  if (!element) throw new Error('Missing element')
  if (!workerUrl) throw new Error('Missing worker URL')
  if (!encodedProps) throw new Error('Missing encoded props')

  const props = JSON.parse(decodeURIComponent(encodedProps))

  run(
    {
      element,
      props,
      worker: new Worker(workerUrl)
    },
    context => {
      setupPortEffects(context.ports)
    }
  )
}
