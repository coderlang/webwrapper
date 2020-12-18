import {Http} from "foundation";
import {HttpBuilder} from "foundation";
import axios from "axios";

export class CURLGetHttp implements Http {
  send(): Promise<[string, (Error | null)]> {
    return new Promise<[string, (Error|null)]>((resolve, reject) => {
      axios({
        method: 'get',
        url: this.builder.baseUrl() + this.builder.uri() + "?" + this.builder.content(),
        headers: this.builder.headers(),
      }).then((res:{data:string}) => {
        resolve([res.data, null]);
      }).catch(() => {
        resolve(["", new Error("net error")]);
      })
    })
  }

  constructor(private builder: HttpBuilder, private headerAPIKey: string = "api") {}
}