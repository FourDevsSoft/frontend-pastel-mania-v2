import { Component } from '@angular/core';
import { SideBarComponent } from '../../../shared/components/adm/side-bar/side-bar.component';
import { BannerComponent } from '../../../shared/components/adm/banner/banner.component';
@Component({
  selector: 'app-analise',
  imports: [SideBarComponent,BannerComponent],
  templateUrl: './analise.component.html',
  styleUrl: './analise.component.css'
})
export class AnaliseComponent {

}
