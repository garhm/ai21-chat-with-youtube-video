import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse, Method } from 'axios';

@Injectable()
export class A21Service {
    private readonly baseUrl = 'https://api.ai21.com/studio/v1/experimental/';

    async makeRequest(
        method: Method,
        endpoint: string,
        token: string,
        params: Record<string, any>,
        data?: Record<string, any>,
    ): Promise<AxiosResponse> {
        const url = `${this.baseUrl}${endpoint}`;

        const config = {
            method,
            url,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: method === 'get' ? params : undefined,
            data: method !== 'get' ? data || params : undefined,
        };
        return await axios(config);
    }
}