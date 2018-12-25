import { Pipe, PipeTransform } from '@angular/core';
import { LockerTypeComponent, Locker } from './locker-type.component';
@Pipe({
  name: 'locker'
})
export class LockerPipe implements PipeTransform {

  transform(value: any, language?: string): any {
    // Get the avaliable colors and filter the ones that match the given value
    const lockers: Locker[] = LockerTypeComponent.lockers.filter(c => c.value === value);
    // if no color matched the value, default to "other", else use the first match
    const f = lockers.length > 0 
            ? lockers[0] 
            :  { value: 'lock-3', viewValue: 'Other', viewValuePt: 'Outro tipo de cadeado'};
    if (language === 'pt')
      return f.viewValuePt;
    return f.viewValuePt;
  }


}
