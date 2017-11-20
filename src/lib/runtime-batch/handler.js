// @flow

import type {Batch} from './'

export default {
  BATCH (cmd: Batch, handleMsg: () => void, handleCmd: () => void, done?: () => void): Promise<void> {
    return Promise.all(cmd.cmds.map(handleCmd)).then(() => {
      if (done) done()
    })
  }
}
