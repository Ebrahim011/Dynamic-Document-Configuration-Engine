import { Component, inject, computed } from '@angular/core';
import { DocumentStateService } from '../../services/document-state.service';

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
        <span class="font-mono text-gray-600">{{ student().verificationCode }}</span>
      </div>
      
      <!-- Official Signatures -->
      <div class="grid grid-cols-3 gap-6">
        @for (sig of student().signatures; track sig.role) {
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
        <div class="text-[7px] font-mono text-gray-400">{{ student().documentRef }}</div>
        <div class="text-[7px] text-gray-400">Issue Date: {{ student().issueDate }}</div>
        <div class="text-[7px] text-gray-400">Valid for {{ student().validDays }} days from date of issue</div>
      </div>
    </div>
  `
})
export class VerificationFooterWidgetComponent {
  private readonly docState = inject(DocumentStateService);
  readonly student = this.docState.selectedStudent;
}
