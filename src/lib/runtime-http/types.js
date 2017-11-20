// @flow

type StatusCode = number

type ResponseUnset = {readyState: 0}
type ResponseOpened = {readyState: 1}
type ResponseHeadersReceived = {readyState: 2, headers: Headers, status: StatusCode}
type ResponseLoading = {readyState: 3, headers: Headers, status: StatusCode, bytesLoaded: number, bytesTotal: number}
type ResponseDone = {
  readyState: 4,
  headers: Headers,
  status: StatusCode,
  text: string,
  bytesLoaded: number,
  bytesTotal: number
}

export type Response = ResponseUnset | ResponseOpened | ResponseHeadersReceived | ResponseLoading | ResponseDone

export type HttpAbort = {
  type: 'HTTP_ABORT',
  id: string
}

export type HttpOpts = {
  labels?: {[key: string]: any}
}

export type HttpGet = {
  type: 'HTTP_GET',
  url: string,
  opts: HttpOpts
}

export type HttpRequest = {
  type: 'HTTP_REQUEST',
  id: string,
  url: string,
  labels?: {[key: string]: string}
}

export type HttpResponse = {
  type: 'HTTP_RESPONSE',
  // readyState: 0 | 1 | 2 | 3 | 4,
  // status: number,
  // headers: {[key: string]: string},
  url: string,
  labels?: {[key: string]: string},
  // text: string,
  body: any,
  errorMessage: string | null,
  payload: Response
}

export type RequestMap = {
  [id: string]: any
}
