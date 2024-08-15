import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FornecedoresModule } from './fornecedores/fornecedores.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [FornecedoresModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
