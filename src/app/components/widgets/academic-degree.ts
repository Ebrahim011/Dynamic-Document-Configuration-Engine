import { Component, inject, computed } from '@angular/core';
import { DocumentStateService, Course } from '../../services/document-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-academic-degree-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="px-7 py-4 border-b border-gray-200">
      <div class="text-[8.5px] font-bold uppercase tracking-[0.18em] mb-3" style="color: #2254c7">Academic Degree Record</div>
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-gray-200">
            <th class="pb-1.5 text-[7.5px] font-semibold text-gray-500 uppercase tracking-wider text-left">Course Code</th>
            <th class="pb-1.5 text-[7.5px] font-semibold text-gray-500 uppercase tracking-wider text-left pl-2">Course Title</th>
            <th class="pb-1.5 text-[7.5px] font-semibold text-gray-500 uppercase tracking-wider text-center pl-2">Cr.</th>
            <th class="pb-1.5 text-[7.5px] font-semibold text-gray-500 uppercase tracking-wider text-center pl-2">Sem.</th>
            <th class="pb-1.5 text-[7.5px] font-semibold text-gray-500 uppercase tracking-wider text-center pl-2">Grade</th>
            <th class="pb-1.5 text-[7.5px] font-semibold text-gray-500 uppercase tracking-wider text-center pl-2">Pts.</th>
          </tr>
        </thead>
        <tbody>
          @for (c of courses; track c.code) {
            <tr class="border-b" [ngClass]="$index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'">
              <td class="py-1 text-[8px] font-mono pr-2" style="color: #2254c7">{{ c.code }}</td>
              <td class="py-1 text-[8.5px] text-gray-800 pl-2 pr-2">{{ c.name }}</td>
              <td class="py-1 text-[8px] text-center text-gray-500 pl-2">{{ c.credits }}</td>
              <td class="py-1 text-[7.5px] text-center text-gray-400 pl-2">{{ c.sem }}</td>
              <td class="py-1 text-[8.5px] text-center font-bold text-gray-800 pl-2">{{ c.grade }}</td>
              <td 
                class="py-1 text-[8px] text-center font-semibold pl-2"
                [ngClass]="{
                  'text-emerald-700': c.pts >= 3.7,
                  'text-amber-700': c.pts >= 3.0 && c.pts < 3.7,
                  'text-red-700': c.pts < 3.0
                }"
              >
                {{ c.pts.toFixed(1) }}
              </td>
            </tr>
          }
        </tbody>
        <tfoot>
          <tr class="border-t-2 border-gray-300 bg-gray-50">
            <td colSpan="2" class="pt-1.5 pb-1 text-[8.5px] font-bold text-gray-700">Totals & Cumulative GPA</td>
            <td class="pt-1.5 pb-1 text-[8.5px] text-center font-bold text-gray-700">{{ totalCredits() }}</td>
            <td class="pt-1.5 pb-1 text-[8px] text-center text-gray-400">—</td>
            <td class="pt-1.5 pb-1 text-[8px] text-center text-gray-400">—</td>
            <td class="pt-1.5 pb-1 text-[9px] text-center font-bold" style="color: #2254c7">{{ cumulativeGpa() }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  `
})
export class AcademicDegreeWidgetComponent {
  private readonly docState = inject(DocumentStateService);

  readonly courses = this.docState.COURSES;

  readonly totalCredits = computed(() => {
    return this.courses.reduce((sum, c) => sum + c.credits, 0);
  });

  readonly cumulativeGpa = computed(() => {
    const totalQualityPts = this.courses.reduce((sum, c) => sum + c.pts * c.credits, 0);
    return (totalQualityPts / this.totalCredits()).toFixed(2);
  });
}
