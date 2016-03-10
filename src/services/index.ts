import { GlobalValServiceInjectables } from './globalval.service'
import { AuthServiceInjectables } from './auth.service'
import { ShowToasterServiceInjectables } from './showtoaster.service'

export * from './globalval.service'
export * from './auth.service'
export * from './showtoaster.service'

export var servicesInjectables: Array<any> = [
		GlobalValServiceInjectables,
		AuthServiceInjectables,
		ShowToasterServiceInjectables
];