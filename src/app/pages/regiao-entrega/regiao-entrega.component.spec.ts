import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiaoEntregaComponent } from './regiao-entrega.component';

describe('RegiaoEntregaComponent', () => {
  let component: RegiaoEntregaComponent;
  let fixture: ComponentFixture<RegiaoEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegiaoEntregaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegiaoEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
