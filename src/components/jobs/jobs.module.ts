import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JobsController } from "./jobs.controller";
import { JobsRepository } from "./jobs.repository";
import { JobsService } from "./jobs.service";

@Module({
  controllers: [JobsController],
  providers: [JobsService, JobsRepository, PrismaService],
})
export class JobsModule {}
