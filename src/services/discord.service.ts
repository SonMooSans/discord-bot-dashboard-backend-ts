import { API_ENDPOINT } from '@config/discord';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

export type UserSession = {
  access_token: string;
  token_type: 'Bearer';
};

@Injectable()
export class DiscordService {
  async getUserID(accessToken: string) {
    const res = await fetch(`${API_ENDPOINT}/users/@me`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });
    if (!res.ok)
      throw new HttpException(
        'Failed to get user data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const user = (await res.json()) as {
      id: string;
    };
    return user.id;
  }
}
