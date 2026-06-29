import { Component } from '@angular/core';

@Component({
  selector: 'app-verification-footer-widget',
  standalone: true,
  template: `
    <div class="px-7 pt-4 pb-5">
      <!-- Divider -->
      <div class="h-px mb-4" style="background: linear-gradient(to right,#2254c7,#f0b100,transparent)"></div>
      
      <!-- Disclaimer text -->
      <div class="text-[7.5px] text-gray-400 text-center leading-relaxed mb-5 px-4">
        This document is an official record issued by Alexandria University of Technology. Any alterations or unauthorized
        modifications render this document invalid. Verification reference:
        <span class="font-mono text-gray-600">AUT-VER-2024-F8A2C1</span>
      </div>
      
      <!-- Official Signatures -->
      <div class="grid grid-cols-3 gap-6">
        @for (sig of signatures; track sig.role) {
          <div class="text-center">
            <div class="h-8 border-b border-gray-400 mb-1.5 flex items-end justify-center pb-0.5">
              <span class="text-[11px] italic text-gray-400 font-serif">{{ sig.shortName }}</span>
            </div>
            <div class="text-[8.5px] font-semibold text-gray-700">{{ sig.name }}</div>
            <div class="text-[7.5px] text-gray-400 mt-0.5">{{ sig.role }}</div>
          </div>
        }
      </div>
      
      <!-- Footer metadata -->
      <div class="mt-4 flex justify-between items-center border-t border-gray-100 pt-3">
        <div class="text-[7px] font-mono text-gray-400">AUCST/REG/2024/Q4</div>
        <div class="text-[7px] text-gray-400">Issue Date: 22 June 2024</div>
        <div class="text-[7px] text-gray-400">Valid for 90 days from date of issue</div>
      </div>
    </div>
  `
})
export class VerificationFooterWidgetComponent {
  readonly signatures = [
    { role: "University Registrar", name: "Dr. Maha El-Sayed", shortName: "Maha" },
    { role: "Dean of Faculty", name: "Prof. Ahmed Khalil", shortName: "Ahmed" },
    { role: "University Provost", name: "Prof. Ibrahim Hassan", shortName: "Ibrahim" }
  ];
}
