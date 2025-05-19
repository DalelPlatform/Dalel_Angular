import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function scheduleValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const schedules = control.value as any[];
    const hasEnabledSchedule = schedules.some(s => s.enabled);
    
    return hasEnabledSchedule ? null : { noSchedule: true };
  };
}