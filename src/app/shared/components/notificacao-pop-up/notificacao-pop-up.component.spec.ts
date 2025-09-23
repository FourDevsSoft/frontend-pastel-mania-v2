import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacaoPopUpComponent } from './notificacao-pop-up.component';

describe('NotificacaoPopUpComponent', () => {
  let component: NotificacaoPopUpComponent;
  let fixture: ComponentFixture<NotificacaoPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacaoPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacaoPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
