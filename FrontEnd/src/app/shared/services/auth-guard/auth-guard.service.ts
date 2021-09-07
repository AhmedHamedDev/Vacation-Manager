import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Abilities } from '../../enums/Abilities';
import { PageMap } from '../../enums/PageMap';
import { AuthSubjectService } from '../auth-subject/auth-subject.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authSubjectService: AuthSubjectService,  private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let userAbilitiesId: number[] = this.authSubjectService.current().abilitiesIds;
    let abilitiesIdsNeedToPass: Abilities[] = PageMap.pages.find(x=> x.url == route.url[0].path).abilitiesIds;

    if(!abilitiesIdsNeedToPass.every(i => userAbilitiesId?.includes(i)))
      this.router.navigateByUrl('/not-authorized');

    return true;
  }

}
