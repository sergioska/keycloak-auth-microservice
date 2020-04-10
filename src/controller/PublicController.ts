import { JsonController, Body, Post, Req, Res, Get } from "routing-controllers";
import { Inject, Service } from "typedi";
import { AuthService } from "../service/AuthService";

@Service()
@JsonController('/public')
export class PublicController {

    @Inject()
    authService: AuthService;

    @Post("/login")
    async loginUser(@Body() body: any) {
        const token = await this.authService.getToken(body.username, body.password);
        return token;
    }

    @Get("/test")
    test(@Req() request: any, @Res() response: any)  {
        return response.send("Hello get!");
    }
}