import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionamentoComponent } from './funcionamento.component';

describe('FuncionamentoComponent', () => {
  let component: FuncionamentoComponent;
  let fixture: ComponentFixture<FuncionamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
