import { Component, inject, computed } from '@angular/core';
import { DocumentStateService } from '../../services/document-state.service';
import { IconComponent } from '../icon';

@Component({
  selector: 'app-student-header-widget',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="px-7 pt-6 pb-5 border-b border-gray-200">
      <!-- Top University Info -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style="background: linear-gradient(135deg,#2254c7,#131f40)">
            <app-icon name="graduationCap" [size]="20" class="text-white" />
          </div>
          <div>
            <div class="text-[11px] font-bold uppercase tracking-[0.14em]" style="color: #131f40">Alexandria University of Technology</div>
            <div class="text-[9px] text-gray-400 tracking-wide mt-0.5">{{ student().faculty }}</div>
          </div>
        </div>
        
        <div class="flex flex-col items-end gap-1.5">
          <!-- QR Code Simulation -->
          <div class="p-1 border border-gray-200 bg-white">
            <div class="grid gap-px" style="grid-template-columns: repeat(7, 6px); grid-template-rows: repeat(7, 6px)">
              @for (cell of qrCells; track $index) {
                <div [style.background]="cell ? '#131f40' : 'transparent'" style="width: 6px; height: 6px;"></div>
              }
            </div>
          </div>
          <div class="text-[7px] font-mono text-gray-400">DOC-2024-{{ lastIdPart() }}</div>
        </div>
      </div>
      
      <!-- Colored divider -->
      <div class="h-px mb-4" style="background: linear-gradient(to right,#2254c7,#f0b100,transparent)"></div>
      
      <!-- Student Profile Section -->
      <div class="flex gap-5 items-start">
        <div class="w-16 h-20 rounded border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center bg-gray-50 shadow-sm">
          <svg class="w-full h-full" viewBox="0 0 64 80">
            <defs>
              <linearGradient [id]="'photoGrad-' + student().id" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" [attr.stop-color]="student().avatarStartColor" />
                <stop offset="100%" [attr.stop-color]="student().avatarEndColor" />
              </linearGradient>
            </defs>
            <rect width="64" height="80" [attr.fill]="'url(#photoGrad-' + student().id + ')'" />
            <path d="M8 80 C8 60, 56 60, 56 80 Z" fill="rgba(255,255,255,0.85)"/>
            <circle cx="32" cy="38" r="14" fill="rgba(255,255,255,0.95)"/>
            <text x="32" y="42" [attr.fill]="student().avatarEndColor" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">
              {{ student().avatarInitials }}
            </text>
          </svg>
        </div>
        
        <div class="flex-1">
          <div class="text-[15px] font-bold tracking-tight leading-tight" style="color: #131f40">{{ student().fullName }}</div>
          <div class="text-[9px] text-gray-400 font-mono mb-3">Student ID: {{ student().id }}</div>
          
          <div class="grid grid-cols-2 gap-x-5 gap-y-1.5">
            @for (info of studentDetails(); track info.k) {
              <div>
                <div class="text-[7.5px] uppercase tracking-widest text-gray-400 font-semibold">{{ info.k }}</div>
                <div class="text-[9px] text-gray-800 font-medium mt-0.5">{{ info.v }}</div>
              </div>
            }
          </div>
        </div>
        
        <!-- Barcode Simulation -->
        <div class="shrink-0 flex flex-col items-end gap-1">
          <div class="flex items-stretch h-10 gap-px">
            @for (w of barcodeWidths; track $index) {
              <div 
                [style.width.px]="w" 
                [style.background]="$index % 3 === 0 ? '#131f40' : $index % 3 === 1 ? '#2254c7' : 'transparent'" 
                class="shrink-0"
              ></div>
            }
          </div>
          <div class="text-[7px] font-mono text-gray-400">{{ barcodeText() }}</div>
        </div>
      </div>
    </div>
  `
})
export class StudentHeaderWidgetComponent {
  private readonly docState = inject(DocumentStateService);

  readonly student = this.docState.selectedStudent;

  readonly lastIdPart = computed(() => {
    return this.student().id.split('-').pop() || '';
  });

  readonly barcodeText = computed(() => {
    return this.student().id.replace(/-/g, '');
  });

  readonly qrCells = [
    1,1,1,1,1,1,1,
    0,0,0,0,0,0,0,
    1,0,1,1,1,0,1,
    1,0,1,0,1,0,1,
    1,0,1,1,1,0,1,
    0,0,0,0,0,0,0,
    1,1,1,1,1,1,1
  ];

  readonly barcodeWidths = [
    2,1,3,1,2,2,1,3,1,1,2,1,3,2,1,2,1,3,1,2,2,1,1,3,2,1,2,3,1,1
  ];

  readonly studentDetails = computed(() => {
    const s = this.student();
    return [
      { k: "Major", v: s.department },
      { k: "Level", v: s.level },
      { k: "Enrollment", v: s.admissionDate },
      { k: "Expected Grad.", v: s.expectedGraduation },
      { k: "Cumulative GPA", v: `${s.cumulativeGpa.toFixed(2)} / 4.00 — ${s.gpaClassification}` },
      { k: "Earned Credits", v: `${s.earnedCredits} / ${s.totalCredits} Required` }
    ];
  });
}
