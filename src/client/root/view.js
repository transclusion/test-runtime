// @flow

/** @jsx el */

import {bem} from 'bem'
// eslint-disable-next-line no-unused-vars
import {el} from 'vdom'
import style from './style.css'

// Import screens
import * as blog from '../screens/blog'
import * as home from '../screens/home'
import * as post from '../screens/post'

import type {Model} from './types'

export function screenView (data: any) {
  const {next, route, screen} = data
  if (!route) return <div class={bem(style.main__screen, next && 'next')}>Not found</div>

  switch (route.value) {
    case 'blog':
      return screen && <div class={bem(style.main__screen, next && 'next')}>{blog.view(screen)}</div>
    case 'home':
      return screen && <div class={bem(style.main__screen, next && 'next')}>{home.view(screen)}</div>
    case 'post':
      return screen && <div class={bem(style.main__screen, next && 'next')}>{post.view(screen)}</div>
    default:
      return <div class={bem(style.main__screen, next && 'next')}>Not found</div>
  }
}

export default function view (model: Model) {
  return (
    <div class={style.main}>
      {screenView({route: model.route, screen: model.screen})}
      {model.nextRoute && screenView({next: true, route: model.nextRoute, screen: model.nextScreen})}
    </div>
  )
}
