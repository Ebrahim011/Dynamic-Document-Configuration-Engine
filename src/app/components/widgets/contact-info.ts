import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-info-widget',
  standalone: true,
  template: `
    <div class="px-6 py-4">
      <div class="text-[8.5px] font-bold uppercase tracking-[0.18em] mb-2.5" style="color: #2254c7">Contact Details</div>
      <div class="space-y-1.5">
        @for (item of contactItems; track item.k) {
          <div class="flex gap-2 items-baseline">
            <span class="text-[7.5px] text-gray-400 shrink-0 w-16">{{ item.k }}</span>
            <span class="text-[9px] text-gray-700">{{ item.v }}</span>
          </div>
        }
      </div>
    </div>
  `
})
export class ContactInfoWidgetComponent {
  readonly contactItems = [
    { k: "Email", v: "e.gabr@student.aut.edu.eg" },
    { k: "Mobile", v: "+20 110 234 5678" },
    { k: "Address", v: "15 El-Nozha St., Alexandria" },
    { k: "Emergency", v: "Ahmed Gabr · +20 100 876 5432" },
    { k: "Nationality", v: "Egyptian" },
    { k: "Date of Birth", v: "14 March 2003" }
  ];
}
