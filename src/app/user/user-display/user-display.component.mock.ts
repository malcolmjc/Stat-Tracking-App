import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-display',
  template: 'MOCK user-display',
})
export class MockUserDisplayComponent {
  @Input() public username: string;
  @Input() public size: 'medium' | 'large' = 'medium';
}
