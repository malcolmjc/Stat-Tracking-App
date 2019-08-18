import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  template: 'MOCK loading-indicator',
})
export class MockLoadingIndicatorComponent {
  @Input() public fullPage = true;
}
