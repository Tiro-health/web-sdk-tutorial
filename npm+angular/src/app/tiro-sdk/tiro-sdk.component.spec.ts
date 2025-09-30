import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiroSdkComponent } from './tiro-sdk.component';

describe('TiroSdkComponent', () => {
  let component: TiroSdkComponent;
  let fixture: ComponentFixture<TiroSdkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiroSdkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TiroSdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});