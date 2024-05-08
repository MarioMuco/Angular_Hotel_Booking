import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <!-- Template Start -->
    <footer>
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
