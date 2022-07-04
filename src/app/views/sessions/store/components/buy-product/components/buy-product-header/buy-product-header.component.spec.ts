import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyProductHeaderComponent } from './buy-product-header.component';

describe('BuyProductHeaderComponent', () => {
  let component: BuyProductHeaderComponent;
  let fixture: ComponentFixture<BuyProductHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyProductHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyProductHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
