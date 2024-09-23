import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { messages } from "src/constants/messages";
import { Role } from "src/enums/roles";
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard, RoleGuard } from "../auth/guards";
import { JobPayloadDto, UpdateJobDto } from "./dto/jobs.dto";
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

  @Roles(Role.RECRUITER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Put(":id")
  async updateJob(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateJobDto: UpdateJobDto,
  ) {
    const updatedJob = await this.jobsService.updateJob(id, updateJobDto);
    return {
      message: messages.JOB.UPDATED_SUCCESS,
      data: updatedJob,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async findAll(@Query("limit") limit: string) {
    const jobs = await this.jobsService.findAllJobs(+limit);
    return {
      message: messages.DATA_FETCHED_SUCCESS,
      data: jobs,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const job = await this.jobsService.findJobById(id);
    return {
      message: messages.DATA_FETCHED_SUCCESS,
      data: job,
    };
  }

  @Roles(Role.RECRUITER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    await this.jobsService.deleteJob(id);
    return {
      message: messages.JOB.DELETED_SUCCESS,
    };
  }
}
