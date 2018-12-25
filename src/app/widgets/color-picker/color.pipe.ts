import { Pipe, PipeTransform } from '@angular/core';
import { ColorPickerComponent, Color } from './color-picker.component';

@Pipe({
  name: 'color'
})
export class ColorPipe implements PipeTransform {

  transform(value: any, language?: string): any {
    // Get the avaliable colors and filter the ones that match the given value
    const colors: Color[] = ColorPickerComponent.colors.filter(c => c.value === value);
    // if no color matched the value, default to "other", else use the first match
    const c = colors.length > 0 ? colors[0] : {value: 'other', viewValue: 'Other', viewValuePt: 'Outra'}
    if (language === 'pt')
      return c.viewValuePt;
    return c.viewValuePt;
  }
}
