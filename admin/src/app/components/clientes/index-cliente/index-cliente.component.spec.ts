import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexClienteComponent } from './index-cliente.component';

describe('IndexClienteComponent', () => {
  let component: IndexClienteComponent;
  let fixture: ComponentFixture<IndexClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
