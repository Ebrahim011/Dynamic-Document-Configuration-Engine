import { Component, inject, computed } from '@angular/core';
import { DocumentStateService } from '../../services/document-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="px-5 py-4">
      <div class="text-[8.5px] font-bold uppercase tracking-[0.18em] mb-2.5" style="color: #2254c7">Attendance Summary</div>
      
      <!-- Summary metrics -->
      <div class="flex gap-5 mb-3">
        @for (m of summaryMetrics(); track m.label) {
          <div class="text-center">
            <div class="text-[16px] font-bold leading-tight" [style.color]="m.color">{{ m.val }}</div>
            <div class="text-[7px] text-gray-400 mt-0.5">{{ m.label }}</div>
          </div>
        }
      </div>

      <!-- Premium Native SVG Bar Chart -->
      <div class="h-[80px] w-full relative group">
        <svg 
          class="w-full h-full" 
          viewBox="0 0 340 75" 
          preserveAspectRatio="none"
        >
          <!-- Horizontal Grid Lines -->
          @for (grid of gridLines; track grid.val) {
            <g>
              <line 
                x1="25" 
                [attr.y1]="grid.y" 
                x2="335" 
                [attr.y2]="grid.y" 
                stroke="#f3f4f6" 
                stroke-width="1"
              />
              <text 
                x="18" 
                [attr.y]="grid.y + 2.5" 
                fill="#9ca3af" 
                font-size="7" 
                text-anchor="end"
                class="font-sans select-none"
              >
                {{ grid.val }}%
              </text>
            </g>
          }

          <!-- X Axis Line -->
          <line x1="25" y1="65" x2="335" y2="65" stroke="#f3f4f6" stroke-width="1" />

          <!-- X Axis Labels -->
          @for (bar of bars(); track bar.label) {
            <text 
              [attr.x]="bar.x + bar.width / 2" 
              y="73" 
              fill="#9ca3af" 
              font-size="7" 
              text-anchor="middle"
              class="font-sans select-none"
            >
              {{ bar.label }}
            </text>
          }

          <!-- Bar Rectangles -->
          @for (bar of bars(); track bar.label) {
            <g 
              class="cursor-pointer"
              (mouseenter)="hoveredIndex = $index"
              (mouseleave)="hoveredIndex = null"
            >
              <!-- Colored Bar Rect -->
              <rect 
                [attr.x]="bar.x" 
                [attr.y]="bar.y" 
                [attr.width]="bar.width" 
                [attr.height]="bar.height" 
                [attr.fill]="bar.isSpecial ? '#f0b100' : '#2254c7'" 
                rx="1.5" 
                ry="1.5" 
                class="transition-all duration-200 hover:opacity-85"
              />
            </g>
          }
        </svg>

        <!-- Hover Tooltip -->
        @if (hoveredIndex !== null) {
          <div 
            class="absolute bg-white border border-gray-100 shadow-md rounded px-2 py-1 text-[8px] pointer-events-none transition-all z-20"
            [style.left.px]="bars()[hoveredIndex].x * 0.95"
            [style.top.px]="bars()[hoveredIndex].y - 28"
          >
            <div class="font-bold text-gray-700">{{ bars()[hoveredIndex].monthName }}</div>
            <div class="text-[#2254c7] font-semibold">Attendance: {{ bars()[hoveredIndex].val }}%</div>
          </div>
        }
      </div>
    </div>
  `
})
export class AttendanceWidgetComponent {
  private readonly docState = inject(DocumentStateService);

  hoveredIndex: number | null = null;

  // Chart dimensions
  readonly width = 340;
  readonly height = 75;
  readonly paddingLeft = 25;
  readonly paddingRight = 5;
  readonly paddingTop = 4;
  readonly paddingBottom = 10;

  readonly minVal = 70;
  readonly maxVal = 100;

  readonly gridLines = [
    { val: 70, y: this.getYCoord(70) },
    { val: 80, y: this.getYCoord(80) },
    { val: 90, y: this.getYCoord(90) },
    { val: 100, y: this.getYCoord(100) },
  ];

  // Computed summary stats
  readonly summaryMetrics = computed(() => {
    const data = this.docState.ATTENDANCE_DATA;
    const avg = Math.round(data.reduce((sum, d) => sum + d.pct, 0) / data.length);
    return [
      { val: `${avg}%`, label: "Avg. Rate", color: "#131f40" },
      { val: "142", label: "Days Present", color: "#16a34a" },
      { val: "10", label: "Days Absent", color: "#dc2626" },
      { val: "4", label: "Excused", color: "#f0b100" },
    ];
  });

  // Calculate bar sizes and positions
  readonly bars = computed(() => {
    const data = this.docState.ATTENDANCE_DATA;
    const plotWidth = this.width - this.paddingLeft - this.paddingRight;
    const barWidth = 14;
    const totalBars = data.length;
    const step = plotWidth / totalBars;
    
    const monthFullNames = [
      "September", "October", "November", "December", 
      "January", "February", "March"
    ];

    return data.map((d, idx) => {
      // Center the bar within its step slot
      const x = this.paddingLeft + idx * step + (step - barWidth) / 2;
      const y = this.getYCoord(d.pct);
      const barHeight = (this.height - this.paddingBottom) - y;

      return {
        x,
        y,
        width: barWidth,
        height: Math.max(2, barHeight), // Ensure at least a sliver is visible
        label: d.month,
        val: d.pct,
        isSpecial: idx === 3, // December (100% attendance index 3) is highlighted in gold
        monthName: monthFullNames[idx]
      };
    });
  });

  private getYCoord(val: number): number {
    const plotHeight = this.height - this.paddingTop - this.paddingBottom;
    const ratio = (val - this.minVal) / (this.maxVal - this.minVal);
    return this.height - this.paddingBottom - ratio * plotHeight;
  }
}
