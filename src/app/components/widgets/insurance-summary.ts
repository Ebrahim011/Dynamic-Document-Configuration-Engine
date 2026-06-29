import { Component } from '@angular/core';

@Component({
  selector: 'app-insurance-summary-widget',
  standalone: true,
  template: `
    <div class="px-6 py-4 relative overflow-hidden">
      <div class="text-[8.5px] font-bold uppercase tracking-[0.18em] mb-2.5" style="color: #2254c7">Insurance & Medical</div>
      <div class="space-y-1.5">
        @for (item of insuranceItems; track item.k) {
          <div class="flex gap-2 items-baseline">
            <span class="text-[7.5px] text-gray-400 shrink-0 w-16">{{ item.k }}</span>
            <span class="text-[9px] text-gray-700">{{ item.v }}</span>
          </div>
        }
      </div>
      
      <!-- Watermarked circular verified seal -->
      <div 
        class="absolute bottom-4 right-4 w-14 h-14 rounded-full border-[2.5px] flex items-center justify-center rotate-[15deg]" 
        style="borderColor: #2254c7; opacity: 0.18"
      >
        <div class="text-[6px] font-bold text-center leading-tight uppercase tracking-wide" style="color: #2254c7">
          AUT<br />Verified
        </div>
      </div>
    </div>
  `
})
export class InsuranceSummaryWidgetComponent {
  readonly insuranceItems = [
    { k: "Policy No.", v: "AUT-INS-2021-04782" },
    { k: "Provider", v: "Egypt National Health Fund" },
    { k: "Coverage", v: "Full Medical & Dental" },
    { k: "Valid Through", v: "August 31, 2025" },
    { k: "Blood Type", v: "O Positive" },
    { k: "Allergies", v: "None documented" }
  ];
}
