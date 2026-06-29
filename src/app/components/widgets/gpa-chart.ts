import { Component, inject } from '@angular/core';
import { DocumentStateService } from '../../services/document-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gpa-chart-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="px-5 py-4">
      <div class="text-[8.5px] font-bold uppercase tracking-[0.18em] mb-2.5" style="color: #2254c7">GPA Progression</div>
      
      <!-- Premium Native SVG Area Chart -->
      <div class="h-[90px] w-full relative group">
        <svg 
          class="w-full h-full" 
          viewBox="0 0 340 85" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="gpaGradDoc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stop-color="#2254c7" stop-opacity="0.2" />
              <stop offset="95%" stop-color="#2254c7" stop-opacity="0" />
            </linearGradient>
          </defs>

          <!-- Horizontal Grid Lines & Y Ticks -->
          @for (grid of gridLines; track grid.val) {
            <g>
              <line 
                x1="25" 
                [attr.y1]="grid.y" 
                x2="335" 
                [attr.y2]="grid.y" 
                stroke="#f0f0f0" 
                stroke-dasharray="2 2" 
                stroke-width="1"
              />
              <text 
                x="18" 
                [attr.y]="grid.y + 3" 
                fill="#9ca3af" 
                font-size="7" 
                text-anchor="end"
                class="font-sans select-none"
              >
                {{ grid.val.toFixed(1) }}
              </text>
            </g>
          }

          <!-- X Axis Line (bottom) -->
          <line x1="25" y1="75" x2="335" y2="75" stroke="#f0f0f0" stroke-width="1" />

          <!-- X Axis Ticks & Labels -->
          @for (pt of points; track pt.label) {
            <g>
              <text 
                [attr.x]="pt.x" 
                y="83" 
                fill="#9ca3af" 
                font-size="7" 
                text-anchor="middle"
                class="font-sans select-none"
              >
                {{ pt.label }}
              </text>
            </g>
          }

          <!-- Area Path -->
          <path 
            [attr.d]="areaPath" 
            fill="url(#gpaGradDoc)" 
          />

          <!-- Stroke Line Path -->
          <path 
            [attr.d]="linePath" 
            fill="none" 
            stroke="#2254c7" 
            stroke-width="1.5" 
          />

          <!-- Data Points (Dots) -->
          @for (pt of points; track pt.label) {
            <g class="cursor-pointer">
              <!-- Invisible outer circle for easier hover -->
              <circle 
                [attr.cx]="pt.x" 
                [attr.cy]="pt.y" 
                r="6" 
                fill="transparent"
                (mouseenter)="hoveredIndex = $index"
                (mouseleave)="hoveredIndex = null"
              />
              <!-- Colored inner circle -->
              <circle 
                [attr.cx]="pt.x" 
                [attr.cy]="pt.y" 
                r="2.5" 
                fill="#2254c7" 
                stroke="#ffffff"
                stroke-width="1"
              />
            </g>
          }
        </svg>

        <!-- Hover Tooltip -->
        @if (hoveredIndex !== null) {
          <div 
            class="absolute bg-white border border-gray-100 shadow-md rounded px-2 py-1 text-[8px] pointer-events-none transition-all z-20"
            [style.left.px]="points[hoveredIndex].x * 0.95"
            [style.top.px]="points[hoveredIndex].y - 28"
          >
            <div class="font-bold text-gray-700">{{ points[hoveredIndex].semName }}</div>
            <div class="text-[#2254c7] font-semibold">GPA: {{ points[hoveredIndex].val.toFixed(2) }}</div>
          </div>
        }
      </div>

      <div class="flex justify-between mt-1.5 border-t border-gray-50 pt-1.5">
        <span class="text-[7px] text-gray-400">Current: <strong style="color: #2254c7">{{ student().cumulativeGpa.toFixed(2) }}</strong></span>
        <span class="text-[7px] text-gray-400">Classification: <strong class="text-gray-600">{{ student().gpaClassification }}</strong></span>
      </div>
    </div>
  `
})
export class GpaChartWidgetComponent {
  private readonly docState = inject(DocumentStateService);

  readonly student = this.docState.selectedStudent;

  hoveredIndex: number | null = null;

  // Chart boundaries
  readonly width = 340;
  readonly height = 85;
  readonly paddingLeft = 25;
  readonly paddingRight = 5;
  readonly paddingTop = 8;
  readonly paddingBottom = 10;

  readonly minGpa = 2.8;
  readonly maxGpa = 4.0;

  // Horizontal grid lines definitions
  get gridLines() {
    const vals = [2.8, 3.1, 3.4, 3.7, 4.0];
    return vals.map(v => ({
      val: v,
      y: this.getYCoord(v)
    }));
  }

  // Map GPA data points to SVG coordinates
  get points() {
    const s = this.student();
    const data = s.gpaData;
    const plotWidth = this.width - this.paddingLeft - this.paddingRight;
    const semNames = [
      "Semester 1", "Semester 2", "Semester 3", 
      "Semester 4", "Semester 5", "Semester 6",
      "Semester 7", "Semester 8", "Semester 9"
    ];
    if (data.length === 0) return [];
    const divisor = data.length > 1 ? data.length - 1 : 1;
    return data.map((d, idx) => {
      const x = this.paddingLeft + idx * (plotWidth / divisor);
      const y = this.getYCoord(d.gpa);
      return {
        x,
        y,
        label: d.s,
        val: d.gpa,
        semName: semNames[idx] || d.s
      };
    });
  }

  // Generate SVG Path for line
  get linePath(): string {
    const pts = this.points;
    if (pts.length === 0) return '';
    return pts.reduce((path, pt, idx) => {
      return path + `${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
    }, '');
  }

  // Generate SVG Path for area under the line
  get areaPath(): string {
    const pts = this.points;
    if (pts.length === 0) return '';
    const line = this.linePath;
    const bottomY = this.height - this.paddingBottom;
    const firstX = pts[0].x;
    const lastX = pts[pts.length - 1].x;
    return `${line} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }

  private getYCoord(gpa: number): number {
    const plotHeight = this.height - this.paddingTop - this.paddingBottom;
    const ratio = (gpa - this.minGpa) / (this.maxGpa - this.minGpa);
    return this.height - this.paddingBottom - ratio * plotHeight;
  }
}
