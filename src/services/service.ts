import { AxiosInstance } from "axios";

export abstract class Service {
  protected constructor(
    protected readonly url: string,
    protected readonly serverAPI: AxiosInstance
  ) { }
}