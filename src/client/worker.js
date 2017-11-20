// @flow

import request from '@transclusion/request'
import {run} from '@transclusion/runtime-worker'
import batchHandler from 'runtime-batch/handler'
import httpHandler from 'runtime-http/handler'
import root from './root'

run({
  handlers: [batchHandler, httpHandler.create({transport: request})],
  program: root,
  scope: self
})
