import { Request, Response } from 'express'
import { Send } from 'express-serve-static-core'

export interface IRequestBody<T> extends Request {
  body: T
}

export interface IResponse<JsonContent> extends Response {
  json: Send<JsonContent, this>
}
