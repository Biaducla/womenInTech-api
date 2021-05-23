export class NestResponse {
  status: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  headers: Object;
  // eslint-disable-next-line @typescript-eslint/ban-types
  body: Object;

  constructor(response: NestResponse) {
    Object.assign(this, response);
  }
}
