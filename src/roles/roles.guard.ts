import { CanActivate, ExecutionContext, forwardRef } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const hasRole = () => user.roles.some(role => roles.includes(role.name));
        if (user.roles.some(role => role.name === 'SYSTEM_ADMIN')) return true;
        return user && user.roles && hasRole();
    }
}
