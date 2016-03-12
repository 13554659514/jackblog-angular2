import { Injectable, bind } from 'angular2/core'
import { ArticleDetail,PrenextArticle } from '../models'
import {Subject, BehaviorSubject, Observable} from 'rxjs'
import { ResourceService } from '../utils/resources'
import { Response } from 'angular2/http'

@Injectable()
export class ArticleService {

	constructor(public rs: ResourceService) {}



}

export var ArticleServiceInjectables: Array<any> = [
  bind(ArticleService).toClass(ArticleService)
]