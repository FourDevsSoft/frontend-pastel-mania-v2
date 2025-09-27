import { Component } from '@angular/core';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { BannerComponent } from '../../shared/components/banner/banner.component';
@Component({
  selector: 'app-categorias-cardapio',
  imports: [SideBarComponent,BannerComponent],
  templateUrl: './categorias-cardapio.component.html',
  styleUrl: './categorias-cardapio.component.css'
})
export class CategoriasCardapioComponent {

}
