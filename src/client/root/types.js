import type {Msg as BlogMsg, Cmd as BlogCmd, Props as BlogProps} from '../screens/blog'
import type {Msg as HomeMsg, Cmd as HomeCmd, Props as HomeProps} from '../screens/home'
import type {Msg as PostMsg, Cmd as PostCmd, Props as PostProps} from '../screens/post'

import type {Route} from 'route'
import type {Batch} from 'runtime-batch'

export type Props = {
  path: string,
  screen?: BlogProps | HomeProps | PostProps
}

export type Model = {
  path: string,
  nextRoute?: Route,
  nextScreen?: any, // blog.Model | home.Model | post.Model
  route?: Route,
  screen?: any // blog.Model | home.Model | post.Model
}

export type Cmd = Batch | BlogCmd | HomeCmd | PostCmd | null

type EffectDone = {type: 'EFFECT_DONE'}
type PushState = {type: 'PUSH_STATE', preventDefault: boolean, path: string, effect?: any}
type PopState = {type: 'POP_STATE', path: string, effect?: any}

export type Msg = EffectDone | PushState | PopState | BlogMsg | HomeMsg | PostMsg
