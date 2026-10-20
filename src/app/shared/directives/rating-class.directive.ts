import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appRatingClass]',
  host: {
    '[class.bad]': 'appRatingClass() >= 1 && appRatingClass() <= 3.5',
    '[class.ok]': 'appRatingClass() >= 4 && appRatingClass() <= 6.5',
    '[class.great]': 'appRatingClass() >= 7 && appRatingClass() <= 8.5',
    '[class.fan]': 'appRatingClass() >= 9 && appRatingClass() <= 10',
  },
})
export class RatingClassDirective {
  readonly appRatingClass = input.required<number>();
}
