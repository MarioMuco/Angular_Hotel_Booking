import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/core/models/app-state.model';
import { ActivatedRoute, Router } from '@angular/router';
import slugify from 'slugify';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css'],
})
export class HotelDetailsComponent implements OnInit {
  hotel: any;
  categories: string[] = [];
  @ViewChild('roomsHeader') roomsHeader!: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit() {
    // Get the slug from the URL route
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('name');
      // Retrieve the hotel information from the store
      this.store.select('hotels').subscribe((state) => {
        this.hotel = state.hotels.find((h) => slugify(h.name) === slug);
        // Get the first 4 amenities
        if (this.hotel && this.hotel.amenities) {
          this.categories = this.hotel.amenities.slice(0, 4);
        }
      });
    });
  }
  bookRoom(room: any) {
    localStorage.setItem('roomName', room.name);
    localStorage.setItem('roomPrice', room.price.toString());
    localStorage.setItem('hotelName', this.hotel.name);
    this.router.navigate(['/payment']);
  }
  scrollToRoomsHeader() {
    this.roomsHeader.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
