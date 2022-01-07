import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gift, SearchGiftResponse } from '../interfaces/gift.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey      :string = 'gockSI4hF8XkGuISVB6r7az5Q8HElVhm';
  private servicioUrl : string = 'http://api.giphy.com/v1/gifs'
  private _historial  : string[] = [];

  public resultados: Gift[] = [];

  get historial():string[]{
    return [...this._historial];
  }

  constructor(private http: HttpClient) { 
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query:string){
    query = query.trim().toLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit',10)
      .set('q',query)
      
    this.http.get<SearchGiftResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe( (resp) =>{
        this.resultados = resp.data;
        localStorage.setItem('resultados',JSON.stringify(this.resultados))
      })
    
  }
}
