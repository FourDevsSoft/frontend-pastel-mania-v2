import { Component } from '@angular/core';
import { SideBarComponent } from '../../../shared/components/adm/side-bar/side-bar.component';
import { BannerComponent } from '../../../shared/components/adm/banner/banner.component';
@Component({
  selector: 'app-pedidos',
  imports: [SideBarComponent,BannerComponent],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {

}
