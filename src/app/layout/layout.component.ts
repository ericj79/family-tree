import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  public flexHeight = true;

  /** Based on the screen size, switch from standard to one column per row */
  public columns = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      this.flexHeight = !matches;
      if (matches) {
        return 2;
      }

      return 1;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}

  openDialog() {
    console.log('open the form');
  }
}
