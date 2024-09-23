import { badRequest } from "@hapi/boom";
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { messages } from "src/constants/messages";
import { PrismaService } from "src/prisma/prisma.service";
import { JobPayloadDto, UpdateJobDto } from "./dto/jobs.dto";
import { JobsRepository } from "./jobs.repository";

@Injectable()
export class JobsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jobsRepository: JobsRepository,
  ) {}

  async createNewJob(userId: number, jobPayloadDto: JobPayloadDto) {
    const { company } = jobPayloadDto;

    await this.prisma.$transaction(async (prismaClient: PrismaClient) => {
      const newCompany = await this.jobsRepository.addCompany(
        prismaClient,
        company,
      );
      return this.jobsRepository.addJob(
        prismaClient,
        userId,
        newCompany.id,
        jobPayloadDto,
      );
    });
  }

  async updateJob(id: number, updateJobDto: UpdateJobDto) {
    const { company } = updateJobDto;

    const job = await this.jobsRepository.fetchJobDetails(id);
    if (!job) {
      throw badRequest(messages.JOB.NOT_FOUND);
    }

    return this.prisma.$transaction(async (prismaClient: PrismaClient) => {
      if (company) {
        // Update company if it's included in the payload
        await this.jobsRepository.updateCompany(prismaClient, id, company);
      }
      // Update the job details
      return this.jobsRepository.updateJob(prismaClient, id, updateJobDto);
    });
  }

  async findAllJobs() {
    return this.jobsRepository.fetchAllJobs();
  }

  async findJobById(id: number) {
    return this.jobsRepository.fetchJobDetails(id);
  }

  async deleteJob(id: number) {
    const job = await this.jobsRepository.fetchJobDetails(id);
    if (!job) {
      throw badRequest(messages.JOB.NOT_FOUND);
    }
    return this.jobsRepository.deleteJob(id);
  }
}
