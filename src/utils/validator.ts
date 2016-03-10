import {
  CORE_DIRECTIVES,
	FORM_DIRECTIVES,
	FormBuilder,
	ControlGroup,
	Control,
	Validators,
	AbstractControl } from 'angular2/common'

export function emailValidator(control: Control): { [s: string]: boolean } {
		if (!control.value.match(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)) {
				return { invalidEmail: true };
		}
}