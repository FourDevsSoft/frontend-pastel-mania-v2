import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { functionUser } from '../../../utils/functionUser'; 

@Component({
  standalone: true, 
  selector: 'app-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.css'],
  imports: [CommonModule,RouterModule]
})
export class ErroComponent {
  codigo: string | null = null;
  funcao: string | null = null;
  constructor(private route: ActivatedRoute) {

    this.codigo = this.route.snapshot.paramMap.get('codigo');

    functionUser().then(result => {
      this.funcao = result;
      console.log(this.funcao)
    });
  }
}
