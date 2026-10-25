
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

type EnquiryStatus = 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Closed';

interface ApiEnquiry {
  id: number | string;
  name: string;
  phone: string;
  customer_type: string;
  city: string;
  monthly_bill: string | null;
  message: string | null;
  status: EnquiryStatus;
  created_at: string;
}

interface Enquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
  service: string;
  city: string;
  date: string;
  status: EnquiryStatus;
}

@Component({
  selector: 'app-enquiries',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './enquiries.html',
  styleUrl: './enquiries.css',
})
export class Enquiries implements OnInit {
  searchTerm = '';
  selectedStatus = 'All';
  selectedService = 'All';

  enquiries: Enquiry[] = [];
  loading = false;
  errorMessage = '';

  readonly statuses: EnquiryStatus[] = [
    'New',
    'Contacted',
    'Qualified',
    'Converted',
    'Closed',
  ];

  private readonly apiUrl = 'http://localhost:3002/api/enquiries';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEnquiries();
  }

  loadEnquiries(): void {
    this.loading = true;
    this.errorMessage = '';

    this.http.get<{
      success: boolean;
      count: number;
      enquiries: ApiEnquiry[];
    }>(this.apiUrl).subscribe({
      next: (response) => {
        this.enquiries = response.enquiries.map((item) => ({
          id: Number(item.id),
          name: item.name,
          phone: item.phone,
          email: '',
          service: this.mapService(item.customer_type),
          city: item.city,
          date: item.created_at,
          status: item.status,
        }));

        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load enquiries:', error);
        this.errorMessage =
          'Unable to load enquiries. Check that the backend is running on port 3002.';
        this.loading = false;
      },
    });
  }

  private mapService(customerType: string): string {
    if (customerType === 'Home' || customerType === 'Residential') {
      return 'Residential';
    }

    if (customerType.toLowerCase().includes('commercial')) {
      return 'Commercial';
    }

    if (customerType.toLowerCase().includes('industrial')) {
      return 'Industrial';
    }

    return customerType;
  }

  get filteredEnquiries(): Enquiry[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.enquiries.filter((enquiry) => {
      const matchesSearch =
        !term ||
        [
          enquiry.name,
          enquiry.phone,
          enquiry.email,
          enquiry.city,
          String(enquiry.id),
        ].some((value) => value.toLowerCase().includes(term));

      const matchesStatus =
        this.selectedStatus === 'All' ||
        enquiry.status === this.selectedStatus;

      const matchesService =
        this.selectedService === 'All' ||
        enquiry.service === this.selectedService;

      return matchesSearch && matchesStatus && matchesService;
    });
  }

  get newCount(): number {
    return this.enquiries.filter((item) => item.status === 'New').length;
  }

  get contactedCount(): number {
    return this.enquiries.filter((item) => item.status === 'Contacted').length;
  }

  get qualifiedCount(): number {
    return this.enquiries.filter((item) => item.status === 'Qualified').length;
  }

  updateStatus(id: number, status: EnquiryStatus): void {
    const enquiry = this.enquiries.find((item) => item.id === id);

    if (enquiry) {
      // Temporary local update; database persistence comes next.
      enquiry.status = status;
    }
  }
}
