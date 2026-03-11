import 'dotenv/config';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from 'prisma/generated/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // Pass the MariaDB driver adapter using the DATABASE_URL from .env
        const url = new URL(process.env.DATABASE_URL!);

    const adapter = new PrismaMariaDb({
      host: url.hostname,           // 127.0.0.1
      port: parseInt(url.port),     // 3307
      user: url.username || 'root', // root
      password: url.password || undefined, // undefined = no password
      database: url.pathname.slice(1),     // fineract_mock
      connectionLimit: 5,
    });

    super({ adapter, log: ['warn', 'error'] });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      // Quick health-check query
      await this.$queryRaw`SELECT 1`;
      console.log('✅ Prisma connected to MySQL/MariaDB');
    } catch (error) {
      console.error('❌ Prisma connection failed:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
