import { ExecutionContext,createParamDecorator } from "@nestjs/common" 
export const UserEmail=createParamDecorator(
    (data:unknown,ctx:ExecutionContext)=>{
        const request=ctx.switchToHttp().getRequest()
        console.log(request)
        console.log(request.user?.userEmail)
           return request.user?.userEmail
    }
)