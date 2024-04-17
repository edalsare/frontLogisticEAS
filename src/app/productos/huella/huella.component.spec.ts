import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuellaComponent } from './huella.component';

describe('HuellaComponent', () => {
  let component: HuellaComponent;
  let fixture: ComponentFixture<HuellaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuellaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HuellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
