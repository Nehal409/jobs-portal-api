import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { JobPayloadDto, UpdateJobDto } from "./dto/jobs.dto";

@Injectable()
export class JobsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async addJob(
    prismaClient: PrismaClient,
    userId: number,
    companyId: number,
    payload: JobPayloadDto,
  ) {
    return prismaClient.jobs.create({
      data: {
        name: payload.title,
        description: payload.description,
        salary: payload.salary,
        location: payload.location,
        jobType: payload.type,
        userId,
        companyId,
      },
    });
  }

  async addCompany(
    prismaClient: PrismaClient,
    payload: JobPayloadDto["company"],
  ) {
    return prismaClient.company.create({
      data: {
        name: payload.name,
        email: payload.contactEmail,
        phone: payload.contactPhone,
        description: payload.description,
      },
    });
  }

  async updateJob(
    prismaClient: PrismaClient,
    id: number,
    payload: UpdateJobDto,
  ) {
    return prismaClient.jobs.update({
      where: { id },
      data: {
        name: payload.title ?? undefined,
        description: payload.description ?? undefined,
        salary: payload.salary ?? undefined,
        location: payload.location ?? undefined,
        jobType: payload.type ?? undefined,
      },
    });
  }

  async updateCompany(
    prismaClient: PrismaClient,
    id: number,
    payload: UpdateJobDto["company"],
  ) {
    return prismaClient.company.update({
      where: { id },
      data: {
        name: payload.name ?? undefined,
        description: payload.description ?? undefined,
        email: payload.contactEmail ?? undefined,
        phone: payload.contactPhone ?? undefined,
      },
    });
  }

  async fetchAllJobs() {
    return this.prisma.jobs.findMany({});
  }

  async fetchJobDetails(id: number) {
    return this.prisma.jobs.findFirst({
      where: { id },
      include: { Company: true },
    });
  }

  async deleteJob(prismaClient: PrismaClient, id: number) {
    return prismaClient.jobs.delete({
      where: { id },
    });
  }

  async deleteCompany(prismaClient: PrismaClient, companyId: number) {
    return prismaClient.company.delete({
      where: { id: companyId },
    });
  }
}
