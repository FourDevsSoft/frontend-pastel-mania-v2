import { Component } from '@angular/core';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { BannerComponent } from '../../shared/components/banner/banner.component';
@Component({
  selector: 'app-mensagens',
  imports: [SideBarComponent,BannerComponent],
  templateUrl: './mensagens.component.html',
  styleUrl: './mensagens.component.css'
})
export class MensagensComponent {

}
