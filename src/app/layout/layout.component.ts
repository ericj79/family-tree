import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  public readonly title1 = '4 Generation Challenge';
  public readonly title2 = 'Something I Learned ...';

  private layout = [
    { title: this.title1, icon: 'family_restroom', cols: 2, rows: 1 },
    { title: this.title2, icon: 'try', cols: 2, rows: 1 },
  ];

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return this.layout;
      }

      const altered = [...this.layout];
      altered[0].cols = 1;
      altered[1].cols = 1;
      return altered;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
