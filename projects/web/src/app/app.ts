import {
  Component,
  OnDestroy,
  OnInit,
  signal,
  ElementRef,
  ViewChild
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';



@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('web');



  protected readonly currentYear = new Date().getFullYear();

  protected enquiryMessage = '';

  // protected submitEnquiry(event: SubmitEvent): void {
  //   event.preventDefault();

  //   const form = event.currentTarget as HTMLFormElement;

  //   if (!form.reportValidity()) {
  //     return;
  //   }

  //   this.enquiryMessage =
  //     'Thank you! The demo form is working. Your enquiry has not been sent to a server yet.';

  //   form.reset();
  // }




  protected readonly slides = [
    {
      eyebrow: 'THOUGHTFUL SOLAR. LASTING VALUE.',
      line1: 'Power a brighter future.',
      line2: 'Start with the sun.',
      description:
        'Solar solutions designed around your property, your energy needs and your plans for the future.',
      image:
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2200&q=85',
      alt: 'Solar panels arranged in a large solar energy installation',
      label: 'RESIDENTIAL SOLAR',

      // Residential slide
      funFact: 'Make your rooftop work for you and reduce your dependence on grid electricity.',
      ctaLabel: 'Estimate My Savings',
      ctaTarget: 'calculator',

    },
    {
      eyebrow: 'SMARTER ENERGY FOR BUSINESS.',
      line1: 'Make your business',
      line2: 'more energy efficient.',
      description:
        'Explore solar solutions designed to help commercial properties manage energy costs and plan ahead.',
      image:
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85',
      alt: 'Modern commercial workspace',
      label: 'COMMERCIAL SOLAR',
      funFact: 'Use rooftop solar to help manage your business electricity costs.',
      ctaLabel: 'Explore Business Savings',
      ctaTarget: 'calculator',
    },
    {
      eyebrow: 'BUILT FOR BIGGER ENERGY NEEDS.',
      line1: "Think Beyond today's Need.",
      line2: 'Power what’s next.',
      description:
        'Discover scalable solar possibilities for industrial facilities, large rooftops and energy-intensive operations.',
      image:
        'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=2200&q=85',
      alt: 'Renewable energy landscape',
      label: 'INDUSTRIAL SOLAR',
      funFact: 'Turn unused roof space into a potential source of long-term energy savings.',
      ctaLabel: 'Discuss Your Requirements',
      ctaTarget: 'contact',
    },
  ];


  protected readonly activeSlide = signal(0);

  private carouselTimer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.carouselTimer = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  ngOnDestroy(): void {
    if (this.carouselTimer) {
      clearInterval(this.carouselTimer);
    }
  }

  protected nextSlide(): void {
    this.activeSlide.update(
      (index) => (index + 1) % this.slides.length,
    );
  }

  protected previousSlide(): void {
    this.activeSlide.update(
      (index) =>
        (index - 1 + this.slides.length) % this.slides.length,
    );
  }

  protected goToSlide(index: number): void {
    this.activeSlide.set(index);
  }

  @ViewChild('customerNameInput')
  protected customerNameInput?: ElementRef<HTMLInputElement>;

  protected focusCustomerForm(): void {
    document.getElementById('test')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    // Wait for smooth scrolling to begin before focusing the field.
    window.setTimeout(() => {
      this.customerNameInput?.nativeElement.focus({
        preventScroll: true,
      });
    }, 500);
  }


  //  calculator

  // type CalculatorStep = 'input' | 'lead' | 'result';

  solarInput = {
    propertyType: 'H',
    monthlyBill: 5000,
    tariff: 8
  };

  lead = {
    name: '',
    phone: '',
    city: '',
    consent: false
  };

  calculatorStep: any = 'input';

  estimatedKw = 0;
  monthlyUnits = 0;
  monthlySavings = 0;
  annualSavings = 0;

  calculateSavings(): void {
    const bill = Number(this.solarInput.monthlyBill);
    const tariff = Number(this.solarInput.tariff);

    if (
      !Number.isFinite(bill) ||
      !Number.isFinite(tariff) ||
      bill < 500 ||
      bill > 100000000 ||
      tariff < 1 ||
      tariff > 100
    ) {
      return;
    }

    // Estimate the monthly electricity consumption.
    const monthlyConsumption = bill / tariff;

    // Initial planning assumption: 120 units per kW per month.
    // Actual generation varies with location and site conditions.
    this.estimatedKw = Math.max(
      0.5,
      Math.round((monthlyConsumption / 120) * 10) / 10
    );

    this.monthlyUnits = Math.round(this.estimatedKw * 120);

    // Illustrative savings, capped at the current electricity bill.
    this.monthlySavings = Math.min(
      bill,
      Math.round(this.monthlyUnits * tariff * 0.8)
    );

    this.annualSavings = this.monthlySavings * 12;

    // Do not reveal the estimate before lead details are submitted.
    this.calculatorStep = 'lead';
  }

  revealSavings(): void {
    if (
      !this.lead.name.trim() ||
      !/^[6-9]\d{9}$/.test(this.lead.phone) ||
      !this.lead.city.trim() ||
      !this.lead.consent
    ) {
      return;
    }

    // Frontend demonstration only.
    // Next, submit the lead to the Node.js backend.


    const message = `
Hello GreenSky Solar, I'm interested in your solar solutions.

I am : ${this.lead.name}
Phone Number: ${this.lead.phone}
Location: ${this.lead.city}

Please contact me regarding my solar enquiry.
  `.trim();

    // Replace with GreenSky Solar's WhatsApp business number.
    // Include country code, without + or spaces.
    const whatsappNumber = '917020484598';

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    this.enquiryMessage =
      'Your enquiry is ready in WhatsApp. Please review it and press Send.';
    // alert("Form Submitted Successfully.");


    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: "Form submitted successfully",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      this.lead = {
        name: '',
        phone: '',
        city: '',
        consent: false
      }

      this.calculatorStep = 'result';
    })
  }



  protected founderImage = 'images/founder-sudarshan-pandey.png';
  protected instaProfileQr = 'images/instagram_profile_qr.png';

  submitEnquiry(event: Event): void {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);

    const name = String(formData.get('name') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const customerType = String(formData.get('customerType') || '');
    const city = String(formData.get('city') || '').trim();

    const message = `
Hello GreenSky Solar, I'm interested in your solar solutions.

I am : ${name}
Phone Number: ${phone}
Solar Requirement: ${customerType}
Location: ${city}

Please contact me regarding my solar enquiry.
  `.trim();

    // Replace with GreenSky Solar's WhatsApp business number.
    // Include country code, without + or spaces.
    const whatsappNumber = '917020484598';

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    this.enquiryMessage =
      'Your enquiry is ready in WhatsApp. Please review it and press Send.';
    // alert("Form Submitted Successfully.");

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: "Form submitted successfully",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      form.reset();
    })

  }



}
