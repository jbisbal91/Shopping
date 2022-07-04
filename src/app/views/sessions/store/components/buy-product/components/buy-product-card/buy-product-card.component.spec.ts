import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyProductCardComponent } from './buy-product-card.component';

describe('BuyProductCardComponent', () => {
  let component: BuyProductCardComponent;
  let fixture: ComponentFixture<BuyProductCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyProductCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
