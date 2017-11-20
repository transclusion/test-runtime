// @flow

import {matchRoute} from 'route'
import {buildLinks} from './helpers'
import routes from '../routes'
import screens from '../screens'

import type {Cmd, Model, Props} from './types'

export default function init (props: Props): [Model, Cmd] {
  const route = matchRoute(props.path, routes)

  if (route) {
    const [screenModel, screenCmd] = screens[route.value].init(
      props.screen || {links: buildLinks(props.path), params: route.params}
    )

    return [
      {
        path: props.path,
        route,
        screen: screenModel
      },
      screenCmd
    ]
  }

  return [{path: props.path}, null]
}
