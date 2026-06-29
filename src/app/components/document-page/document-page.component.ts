import { Component, inject } from '@angular/core';
import { DocumentStateService, WidgetId } from '../../services/document-state.service';
import { StudentHeaderWidgetComponent } from '../widgets/student-header';
import { ContactInfoWidgetComponent } from '../widgets/contact-info';
import { InsuranceSummaryWidgetComponent } from '../widgets/insurance-summary';
import { AcademicDegreeWidgetComponent } from '../widgets/academic-degree';
import { AttendanceWidgetComponent } from '../widgets/attendance';
import { GpaChartWidgetComponent } from '../widgets/gpa-chart';
import { VerificationFooterWidgetComponent } from '../widgets/verification-footer';
import { IconComponent } from '../icon';

@Component({
  selector: 'app-document-page',
  standalone: true,
  imports: [
    IconComponent,
    StudentHeaderWidgetComponent,
    ContactInfoWidgetComponent,
    InsuranceSummaryWidgetComponent,
    AcademicDegreeWidgetComponent,
    AttendanceWidgetComponent,
    GpaChartWidgetComponent,
    VerificationFooterWidgetComponent
  ],
  template: `
    <div class="bg-white text-gray-900 min-h-full transition-all duration-300">
      <!-- Fallback when no widgets selected -->
      @if (activeWidgets().size === 0) {
        <div class="flex flex-col items-center justify-center min-h-[480px] bg-white animate-fade-in">
          <div class="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
            <app-icon name="fileText" [size]="28" class="text-gray-200" />
          </div>
          <div class="text-sm font-semibold text-gray-300 mb-1">No widgets selected</div>
          <div class="text-xs text-gray-200 text-center max-w-[200px] leading-relaxed">
            Enable at least one widget from the sidebar to preview your document.
          </div>
        </div>
      }

      <!-- 1. Student Header Widget -->
      @if (show('studentHeader')) {
        <div class="animate-slide-down overflow-hidden">
          <app-student-header-widget />
        </div>
      }

      <!-- 2. Contact Info & Insurance Widgets (Side-by-side row) -->
      @if (show('contactInfo') || show('insurance')) {
        <div class="flex border-b border-gray-200 animate-slide-down overflow-hidden">
          @if (show('contactInfo')) {
            <div [class]="show('insurance') ? 'flex-1 border-r border-gray-100' : 'flex-1'">
              <app-contact-info-widget />
            </div>
          }
          @if (show('insurance')) {
            <div class="flex-1">
              <app-insurance-summary-widget />
            </div>
          }
        </div>
      }

      <!-- 3. Academic Degree summary table -->
      @if (show('academicDegree')) {
        <div class="animate-slide-down overflow-hidden">
          <app-academic-degree-widget />
        </div>
      }

      <!-- 4. Attendance & GPA Chart (Side-by-side row) -->
      @if (show('attendance') || show('gpaChart')) {
        <div class="flex border-b border-gray-200 animate-slide-down overflow-hidden">
          @if (show('attendance')) {
            <div [class]="show('gpaChart') ? 'flex-[3] border-r border-gray-100' : 'flex-1'">
              <app-attendance-widget />
            </div>
          }
          @if (show('gpaChart')) {
            <div [class]="show('attendance') ? 'flex-[2]' : 'flex-1'">
              <app-gpa-chart-widget />
            </div>
          }
        </div>
      }

      <!-- 5. Official Verification footer -->
      @if (show('verification')) {
        <div class="animate-slide-down overflow-hidden">
          <app-verification-footer-widget />
        </div>
      }
    </div>
  `,
  styles: [`
    /* Simple smooth entrance animation classes */
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
    .animate-slide-down {
      animation: slideDown 0.25s ease-out forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes slideDown {
      from { opacity: 0; max-height: 0; transform: translateY(-5px); }
      to { opacity: 1; max-height: 1000px; transform: translateY(0); }
    }
  `]
})
export class DocumentPageComponent {
  private readonly docState = inject(DocumentStateService);

  readonly activeWidgets = this.docState.activeWidgets;

  show(id: WidgetId): boolean {
    return this.activeWidgets().has(id);
  }
}
