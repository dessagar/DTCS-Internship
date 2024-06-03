import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBySubject'
})
export class FilterBySubjectPipe implements PipeTransform {
  transform(formData: any[], selectedSubject: string): any[] {
    if (!selectedSubject || !formData) {
      return [];
    }
    return formData.filter(item => item.subject === selectedSubject);
  }
}
