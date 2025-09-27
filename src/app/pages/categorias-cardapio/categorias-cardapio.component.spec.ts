import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasCardapioComponent } from './categorias-cardapio.component';

describe('CategoriasCardapioComponent', () => {
  let component: CategoriasCardapioComponent;
  let fixture: ComponentFixture<CategoriasCardapioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasCardapioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriasCardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
