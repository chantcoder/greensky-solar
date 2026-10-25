import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  readonly stats = [
    { label: 'Total enquiries', value: '128', note: 'All enquiries received' },
    { label: 'Pending follow-ups', value: '24', note: 'Require attention' },
    { label: 'Active projects', value: '12', note: 'Projects in progress' },
    { label: 'Published services', value: '6', note: 'Available on website' },
  ];
}
