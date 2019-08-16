import { Component } from '@angular/core';
import { faHeart } from '@fortawesome/pro-regular-svg-icons';

@Component({
  selector: 'app-trips',
  styleUrls: ['./trips.component.scss'],
  templateUrl: './trips.component.html',
})
export class TripsComponent {
    public myIcon = faHeart;
}
