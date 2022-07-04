import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyProductFooterComponent } from './buy-product-footer.component';

describe('BuyProductFooterComponent', () => {
  let component: BuyProductFooterComponent;
  let fixture: ComponentFixture<BuyProductFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyProductFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyProductFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
