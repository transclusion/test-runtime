// @flow

import type {Link} from '../../types'

export function buildLinks (path: string): Link[] {
  return [
    // {
    //   active: path === '/',
    //   label: 'Home',
    //   path: '/'
    // },
    {
      active: path === '/blog',
      label: 'Blog',
      path: '/blog'
    }
  ]
}
