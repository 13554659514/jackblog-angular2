import { GlobalValServiceInjectables } from './globalval.service'
import { AuthServiceInjectables } from './auth.service'
import { TagServiceInjectables } from './tag.service'
import { MobileServiceInjectables } from './mobile.service'

export * from './globalval.service'
export * from './auth.service'
export * from './tag.service'
export * from './mobile.service'

export var servicesInjectables: Array<any> = [
		GlobalValServiceInjectables,
		AuthServiceInjectables,
		TagServiceInjectables,
		MobileServiceInjectables
]