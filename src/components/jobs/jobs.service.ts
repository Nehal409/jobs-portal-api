import { Injectable } from "@nestjs/common";
import { JobPayloadDto } from "./dto/jobs.dto";

@Injectable()
export class JobsService {
  async createNewJob(userId: number, jobPayloadDto: JobPayloadDto) {
    return { userId, jobPayloadDto };
  }

  findAll() {
    return `This action returns all jobs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
