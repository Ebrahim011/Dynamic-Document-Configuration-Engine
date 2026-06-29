import { Component } from '@angular/core';
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
            <div class="text-[9px] text-gray-400 tracking-wide mt-0.5">Faculty of Computer Science & Information Technology</div>
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
          <div class="text-[7px] font-mono text-gray-400">DOC-2024-04782</div>
        </div>
      </div>
      
      <!-- Colored divider -->
      <div class="h-px mb-4" style="background: linear-gradient(to right,#2254c7,#f0b100,transparent)"></div>
      
      <!-- Student Profile Section -->
      <div class="flex gap-5 items-start">
        <div class="w-16 h-20 bg-gray-100 border border-gray-200 flex flex-col items-center justify-center shrink-0 gap-1 text-gray-300">
          <app-icon name="user" [size]="22" />
          <span class="text-[7px] text-gray-300">PHOTO</span>
        </div>
        
        <div class="flex-1">
          <div class="text-[15px] font-bold tracking-tight leading-tight" style="color: #131f40">Ebrahim Ahmed Gabr</div>
          <div class="text-[9px] text-gray-400 font-mono mb-3">Student ID: 2021-CS-04782</div>
          
          <div class="grid grid-cols-2 gap-x-5 gap-y-1.5">
            @for (info of studentDetails; track info.k) {
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
          <div class="text-[7px] font-mono text-gray-400">2021CS04782</div>
        </div>
      </div>
    </div>
  `
})
export class StudentHeaderWidgetComponent {
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

  readonly studentDetails = [
    { k: "Major", v: "Computer Science — Information Systems" },
    { k: "Level", v: "Senior · Year 4, Semester 7" },
    { k: "Enrollment", v: "September 2021" },
    { k: "Expected Grad.", v: "June 2025" },
    { k: "Cumulative GPA", v: "3.62 / 4.00 — Distinction" },
    { k: "Earned Credits", v: "112 / 132 Required" }
  ];
}
