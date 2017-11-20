// @flow

import screens from '../screens'

import type {Model, Props} from './types'

export default function mapModelToProps (model: Model): Props {
  if (model.route && screens[model.route.value]) {
    return {
      path: model.path,
      screen: screens[model.route.value].mapModelToProps(model.screen)
    }
  }

  return {
    path: model.path
  }
}
