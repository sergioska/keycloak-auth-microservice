import axios from 'axios';
import * as qs from 'qs';
import { logger } from '../utils/logger';

export class AuthService {
    static readonly tokenUrl = '/auth/realms/demo/protocol/openid-connect/token';
    static readonly grantType = 'password';
    static readonly scope = 'openid';
    authUrl: string;
    clientId: string;
    clientSecret: string;

    constructor(
        { authUrl = process.env.authUrl, clientId = process.env.clientId, clientSecret = process.env.clientSecret }:
        { authUrl?: string; clientId?: string; clientSecret?: string } = {}
    ) {
        this.authUrl = authUrl;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    async getToken(username: string, password: string): Promise<any> {
        try {
            const url = `${this.authUrl}${AuthService.tokenUrl}`;
            const requestBody = {
                'client_id': this.clientId,
                'grant_type': AuthService.grantType,
                'client_secret': this.clientSecret,
                'scope': AuthService.scope,
                username,
                password
            };
            const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            const response = await axios.post(url, qs.stringify(requestBody), config);
            return response.data;
        } catch (err) {
            logger.info(`error ${err}`);
        }
    }
}