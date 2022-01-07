import { Component } from '@angular/core';
import { Gift } from '../interfaces/gift.interface';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent{

  get resultados():Gift[]{
    return this.gifsService.resultados;
  }

  constructor(private gifsService: GifsService) { }

  

}
