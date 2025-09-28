import { Component } from '@angular/core';
import { MenuComponent } from '../../../shared/components/cliente-final/menu/menu.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-landingpage',
  imports: [MenuComponent,CommonModule],
  standalone: true,
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {

}
