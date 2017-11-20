// @flow

import {matchRoute} from 'route'
import {batch} from 'runtime-batch'
import {buildLinks} from './helpers'
import routes from '../routes'
import screens from '../screens'

import type {Cmd, Model, Msg} from './types'

export default function update (model: Model, msg: Msg): [Model, Cmd] {
  switch (msg.type) {
    case 'PUSH_STATE':
    case 'POP_STATE': {
      const route = matchRoute(msg.path, routes)

      if (route) {
        const [screenModel, screenCmd] = screens[route.value].init({links: buildLinks(msg.path), params: route.params})

        if (msg.effect) {
          return [
            {
              ...model,
              path: msg.path,
              nextRoute: route,
              nextScreen: screenModel
            },
            batch(screenCmd, {type: 'EFFECT', effect: msg.effect})
          ]
        }

        return [
          {
            path: msg.path,
            route,
            screen: screenModel
          },
          screenCmd
        ]
      }

      return [{path: msg.path}, null]
    }

    case 'EFFECT_DONE':
      return [
        {
          path: model.path,
          route: model.nextRoute,
          screen: model.nextScreen
        },
        null
      ]

    default: {
      if (model.nextRoute) {
        const [screenModel, screenCmd] = screens[model.nextRoute.value].update(model.nextScreen, msg)

        return [{...model, nextScreen: screenModel}, screenCmd]
      }

      if (model.route) {
        const [screenModel, screenCmd] = screens[model.route.value].update(model.screen, msg)

        return [{...model, screen: screenModel}, screenCmd]
      }

      console.log('Unhandled message:', msg)
      return [model, null]
    }
  }
}
