import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { messages } from "src/constants/messages";
import { Role } from "src/enums/roles";
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard, RoleGuard } from "../auth/guards";
import { JobPayloadDto } from "./dto/jobs.dto";
import { JobsService } from "./jobs.service";

@ApiTags("Jobs")
@Controller("jobs")
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Roles(Role.RECRUITER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Post()
  async createJob(@Req() req, @Body() jobPayloadDto: JobPayloadDto) {
    const { userId } = req.user;
    const job = await this.jobsService.createNewJob(userId, jobPayloadDto);
    return {
      message: messages.JOB.CREATED_SUCCESS,
      data: job,
    };
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.jobsService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.jobsService.remove(+id);
  }
}
