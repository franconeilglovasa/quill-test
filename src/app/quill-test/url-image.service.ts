import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { take,map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
export class ImageService {
  constructor(private http: HttpClient) { }

  imageUrlToBase64(urL: string) {
    return this.http.get(urL, {
        observe: 'body',
        responseType: 'arraybuffer',
      })
      .pipe(take(1),
        map((arrayBuffer) =>
          btoa(
            Array.from(new Uint8Array(arrayBuffer))
            .map((b) => String.fromCharCode(b))
            .join('')
          )
        ),
      )
  }
}