import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyledNavigationComponent } from './styled-navigation.component';

describe('StyledNavigationComponent', () => {
  let component: StyledNavigationComponent;
  let fixture: ComponentFixture<StyledNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StyledNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StyledNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
