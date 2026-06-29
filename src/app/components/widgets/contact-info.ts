import { Component, inject, computed } from '@angular/core';
import { DocumentStateService } from '../../services/document-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-info-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="px-6 py-4">
      <div class="text-[8.5px] font-bold uppercase tracking-[0.18em] mb-2.5" style="color: #2254c7">Contact Details</div>
      <div class="space-y-1.5">
        @for (item of contactItems(); track item.k) {
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
  private readonly docState = inject(DocumentStateService);

  readonly student = this.docState.selectedStudent;

  readonly contactItems = computed(() => {
    const s = this.student();
    return [
      { k: "Email", v: s.email },
      { k: "Mobile", v: s.phone },
      { k: "Address", v: s.address },
      { k: "Emergency", v: `${s.emergencyContactName} · ${s.emergencyContactPhone} (${s.emergencyContactRelation})` },
      { k: "Nationality", v: s.nationality },
      { k: "Date of Birth", v: s.dob }
    ];
  });
}
