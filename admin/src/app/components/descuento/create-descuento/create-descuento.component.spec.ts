import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDescuentoComponent } from './create-descuento.component';

describe('CreateDescuentoComponent', () => {
  let component: CreateDescuentoComponent;
  let fixture: ComponentFixture<CreateDescuentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDescuentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
