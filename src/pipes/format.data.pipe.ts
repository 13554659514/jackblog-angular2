import { Pipe,PipeTransform } from '@angular/core'

@Pipe({ name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {
	transform(time: string): string {
		let tmpDate = new Date(time)
		let year = tmpDate.getFullYear()
		let mathon = tmpDate.getMonth() + 1
		let day = tmpDate.getDate()
		let hours = tmpDate.getHours()
		let minutes = tmpDate.getMinutes()
		return year + '.' + mathon + '.' + day + ' ' + hours + ':' + minutes
	}
}