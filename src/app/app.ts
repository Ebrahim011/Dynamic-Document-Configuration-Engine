import { Component, inject, computed, signal, ViewChild, ElementRef } from '@angular/core';
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

  protected readonly exportErrorMsg = signal<string>('');

  // Generate and download a pixel-perfect PDF of the document preview
  async exportPdf() {
    if (this.state.activeWidgets().size === 0) {
      this.exportErrorMsg.set('Select at least one widget before exporting.');
      this.state.exportState.set('error');
      setTimeout(() => this.state.exportState.set('idle'), 3500);
      return;
    }

    this.state.exportState.set('loading');
    this.exportErrorMsg.set('');
    
    // Clone element into an off-screen container to avoid parent transform/scale
    // interference and CSS animation side-effects that freeze html2canvas
    let offscreen: HTMLDivElement | null = null;
    
    try {
      // Dynamically import from the minified bundle to bypass ESM/CJS interop issues and Vite build warnings
      // @ts-ignore
      const html2pdfModule = await import('html2pdf.js/dist/html2pdf.min.js');
      
      let html2pdf: any = html2pdfModule;
      if (html2pdf && html2pdf.default) {
        html2pdf = html2pdf.default;
      }
      if (html2pdf && html2pdf.default) {
        html2pdf = html2pdf.default;
      }
      
      if (typeof html2pdf !== 'function') {
        const winHtml2pdf = (window as any).html2pdf;
        if (typeof winHtml2pdf === 'function') {
          html2pdf = winHtml2pdf;
        } else {
          throw new Error(`html2pdf was not loaded correctly (Type: ${typeof html2pdfModule}, resolved: ${typeof html2pdf}).`);
        }
      }
      
      const source = this.pdfContent.nativeElement as HTMLElement;
      const isA4 = this.state.pageSizeA4();
      const docWidth = this.state.docWidth();
      
      // Create off-screen container that is detached from any CSS transforms
      offscreen = document.createElement('div');
      offscreen.style.cssText = `
        position: fixed; left: -9999px; top: 0;
        width: ${docWidth}px; background: white;
        transform: none !important; z-index: -1;
        overflow: visible;
      `;
      
      // Deep clone the document content
      const clone = source.cloneNode(true) as HTMLElement;
      
      // Strip ALL animations, transitions, and animation side-effects from the clone.
      // The slideDown keyframes start at opacity:0 / max-height:0 which causes
      // html2canvas to render invisible or oversized content, freezing the UI.
      clone.querySelectorAll('*').forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.animation = 'none';
        htmlEl.style.transition = 'none';
        htmlEl.style.maxHeight = 'none';
        htmlEl.style.opacity = '1';
        htmlEl.style.overflow = 'visible';
        htmlEl.style.transform = 'none';
      });
      clone.style.animation = 'none';
      clone.style.transition = 'none';
      clone.style.maxHeight = 'none';
      clone.style.opacity = '1';
      clone.style.overflow = 'visible';
      clone.style.transform = 'none';
      
      offscreen.appendChild(clone);
      document.body.appendChild(offscreen);
      
      // Allow a brief tick for the DOM to settle after appending
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const student = this.state.selectedStudent();
      const sanitizedName = student.fullName.replace(/\s+/g, '_');
      const sanitizedId = student.id.replace(/-/g, '');
      
      const opt: any = { 
        margin: 0,
        filename: `${sanitizedName}_${sanitizedId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, // 2x scale for high-definition rendering
          useCORS: true,
          logging: false,
          scrollX: 0,
          scrollY: 0,
          width: docWidth,
          windowWidth: docWidth
        },
        jsPDF: { 
          unit: 'pt', 
          format: isA4 ? 'a4' : 'letter', 
          orientation: 'portrait' 
        }
      };
      
      // Generate from the clean off-screen clone, trigger browser download
      await html2pdf().from(clone).set(opt).save();
      
      this.state.exportState.set('success');
      setTimeout(() => this.state.exportState.set('idle'), 3500);
    } catch (error: any) {
      console.error('PDF generation error:', error);
      this.exportErrorMsg.set(error?.message || String(error) || 'An unknown error occurred during PDF generation.');
      this.state.exportState.set('error');
      setTimeout(() => this.state.exportState.set('idle'), 5000);
    } finally {
      // Always clean up the off-screen container
      if (offscreen && offscreen.parentNode) {
        offscreen.parentNode.removeChild(offscreen);
      }
    }
  }
}
