import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicarHorariosComponent } from './aplicar-horarios.component';

describe('AplicarHorariosComponent', () => {
  let component: AplicarHorariosComponent;
  let fixture: ComponentFixture<AplicarHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AplicarHorariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AplicarHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
