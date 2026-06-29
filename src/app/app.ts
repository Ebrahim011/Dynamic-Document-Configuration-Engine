import { Component, inject, computed, ViewChild, ElementRef } from '@angular/core';
import { DocumentStateService, Template, AccordionSection, WidgetId, Student } from './services/document-state.service';
import { IconComponent } from './components/icon';
import { DocumentPageComponent } from './components/document-page/document-page.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IconComponent, DocumentPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly state = inject(DocumentStateService);

  @ViewChild('pdfContent', { read: ElementRef, static: false }) pdfContent!: ElementRef;

  // Expose data and lists from service
  readonly templates = this.state.TEMPLATES;
  readonly accordionSections = this.state.ACCORDION_SECTIONS;
  readonly widgetLabels = this.state.WIDGET_LABELS;

  // Search state for templates
  protected templateQuery = '';

  // Student search state
  protected studentSearchQuery = '';
  protected showStudentDropdown = false;

  // Filter students based on name or ID query
  protected readonly filteredStudents = computed(() => {
    const q = this.studentSearchQuery.trim().toLowerCase();
    if (!q) return this.state.STUDENTS;
    return this.state.STUDENTS.filter(s =>
      s.fullName.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q)
    );
  });

  // Select a student from results
  protected selectStudent(student: Student) {
    this.state.selectedStudentId.set(student.id);
    this.studentSearchQuery = '';
    this.showStudentDropdown = false;
  }

  // Handle student search text input
  protected onStudentSearchInput(event: Event) {
    this.studentSearchQuery = (event.target as HTMLInputElement).value;
    this.showStudentDropdown = true;
  }

  // Close student search dropdown after a brief delay to allow click events to register
  protected onStudentSearchBlur() {
    setTimeout(() => {
      this.showStudentDropdown = false;
    }, 200);
  }

  // Filter templates based on query
  protected readonly filteredTemplates = computed(() => {
    const q = this.templateQuery.trim().toLowerCase();
    if (!q) return this.templates;
    return this.templates.filter(t => 
      t.name.toLowerCase().includes(q) || 
      t.description.toLowerCase().includes(q)
    );
  });

  // Check if a template is active
  protected isTemplateActive(templateId: string): boolean {
    return this.state.selectedTemplate() === templateId;
  }

  // Get active count for an accordion section
  protected getActiveWidgetCount(section: AccordionSection): number {
    return section.widgets.filter(w => this.state.activeWidgets().has(w.id)).length;
  }

  // Check if all widgets in section are active
  protected isSectionAllActive(section: AccordionSection): boolean {
    return this.getActiveWidgetCount(section) === section.widgets.length;
  }

  // Handle template search input
  protected onSearchInput(event: Event) {
    this.templateQuery = (event.target as HTMLInputElement).value;
  }

  // Template tag styles mapping
  protected getTagStyle(tag: string) {
    const styles: Record<string, { bg: string; color: string }> = {
      Official:    { bg: "rgba(34,84,199,0.10)",  color: "#2254c7" },
      Complete:    { bg: "rgba(22,163,74,0.10)",  color: "#16a34a" },
      Attendance:  { bg: "rgba(240,177,0,0.15)",  color: "#9a7200" },
      Academic:    { bg: "rgba(19,31,64,0.08)",   color: "#131f40" },
    };
    return styles[tag] || { bg: "#f3f4f6", color: "#6b7280" };
  }

  // Generate and download a pixel-perfect PDF of the document preview
  async exportPdf() {
    if (this.state.activeWidgets().size === 0) {
      this.state.exportState.set('error');
      setTimeout(() => this.state.exportState.set('idle'), 3500);
      return;
    }

    this.state.exportState.set('loading');
    
    try {
      // Dynamically import html2pdf.js for optimal bundler compatibility and code-splitting
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = this.pdfContent.nativeElement;
      const isA4 = this.state.pageSizeA4();
      
      const opt: any = { 
        margin: 0,
        filename: 'Gabr_Ebrahim_2021CS04782.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2.5, // 2.5x scale for high-definition rendering (perfect text and vectors)
          useCORS: true,
          logging: false,
          scrollX: 0,
          scrollY: 0
        },
        jsPDF: { 
          unit: 'pt', 
          format: isA4 ? 'a4' : 'letter', 
          orientation: 'portrait' 
        }
      };
      
      // Generate, trigger browser download, and await completion
      await html2pdf().from(element).set(opt).save();
      
      this.state.exportState.set('success');
      setTimeout(() => this.state.exportState.set('idle'), 3500);
    } catch (error) {
      console.error('PDF generation error:', error);
      this.state.exportState.set('error');
      setTimeout(() => this.state.exportState.set('idle'), 3500);
    }
  }
}
