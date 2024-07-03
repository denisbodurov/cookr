import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ThrottlerAsyncOptions,
  ThrottlerModuleOptions,
} from '@nestjs/throttler';

export const throttlerAsyncConfig: ThrottlerAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<ThrottlerModuleOptions> => {
    return [
      {
        ttl: parseInt(configService.get('THROTTLER_TTL')),
        limit: parseInt(configService.get('THROTTLER_LIMIT')),
      },
    ];
  },
  inject: [ConfigService],
};
