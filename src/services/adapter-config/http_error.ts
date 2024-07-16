/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
export class HttpError {
  constructor(
    public code: number,
    public message: any
  ) {}

  preventDefault: boolean = false;
}
