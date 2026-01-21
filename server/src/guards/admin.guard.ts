import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    console.log("🚀 ~ AdminGuard ~ canActivate ~ request.session.user:", request.session.user)
    if (!request.session.user) {
      console.log('Session user not found')
      return false;
    }

    return request.session.user.isAdmin;
  }
}
