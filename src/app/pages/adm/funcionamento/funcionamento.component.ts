import { Component } from '@angular/core';
import { SideBarComponent } from '../../../shared/components/adm/side-bar/side-bar.component';
import { BannerComponent } from '../../../shared/components/adm/banner/banner.component';
@Component({
  selector: 'app-funcionamento',
  imports: [SideBarComponent,BannerComponent],
  templateUrl: './funcionamento.component.html',
  styleUrl: './funcionamento.component.css'
})
export class FuncionamentoComponent {

}
