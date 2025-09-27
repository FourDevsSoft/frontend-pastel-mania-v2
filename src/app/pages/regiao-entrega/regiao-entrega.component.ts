import { Component } from '@angular/core';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { BannerComponent } from '../../shared/components/banner/banner.component';
@Component({
  selector: 'app-regiao-entrega',
  imports: [SideBarComponent,BannerComponent],
  templateUrl: './regiao-entrega.component.html',
  styleUrl: './regiao-entrega.component.css'
})
export class RegiaoEntregaComponent {

}
