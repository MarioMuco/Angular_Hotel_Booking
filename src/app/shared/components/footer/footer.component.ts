import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <!-- Template Start -->
    <footer>
      <div class="company-info">
        <h2>Kagan Booking</h2>
        <div class="icon-container">
          <img src="assets/icons/facebook.svg" alt="facebook" />
          <img src="assets/icons/youtube.svg" alt="youtube" />
          <img src="assets/icons/twitter.svg" alt="twitter" />
          <img src="assets/icons/instagram.svg" alt="instagram" />
        </div>
      </div>
      <div class="footer-section" *ngFor="let section of sections">
        <h2>{{ section.title }}</h2>
        <ul>
          <li *ngFor="let item of section.items">{{ item }}</li>
        </ul>
      </div>
    </footer>

    <!-- Template End -->
  `,
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  sections = [
    {
      title: 'Our Destinations',
      items: ['Canada', 'Alaska', 'Turkey', 'Iceland'],
    },
    {
      title: 'Our Activities',
      items: [
        'Northern Lights',
        'Whale Watching',
        'Ice Climbing',
        'Hot Air Ballooning',
      ],
    },
    {
      title: 'Travel Blogs',
      items: [
        'Bali Travel Guide',
        'How to Travel Alone',
        'How to Travel on a Budget',
        'How to Travel with Kids',
      ],
    },
    {
      title: 'About Us',
      items: ['Our Story', 'Work with us', 'Contact Us'],
    },
  ];
}
