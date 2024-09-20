import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { JobType } from "src/enums/jobTypes";

const jobTypes = z.enum([
  JobType.FULL_TIME,
  JobType.PART_TIME,
  JobType.REMOTE,
  JobType.INTERNSHIP,
]);

const CompanySchema = z.object({
  name: z.string().min(1, { message: "field is required" }),
  description: z.string().optional(),
  contactEmail: z.string().email({ message: "invalid email address" }),
  contactPhone: z.string().min(1, { message: "field is required" }),
});

const JobPayloadSchema = z.object({
  title: z.string().min(1, { message: "field is required" }),
  type: jobTypes,
  location: z.string().min(1, { message: "field is required" }),
  description: z.string().min(1, { message: "field is required" }),
  salary: z.string().min(1, { message: "field is required" }),
  company: CompanySchema,
});

export class JobPayloadDto extends createZodDto(JobPayloadSchema) {}
