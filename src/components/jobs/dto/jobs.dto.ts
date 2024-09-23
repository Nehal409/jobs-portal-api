import { JobType } from "@prisma/client";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const jobTypes = z.enum([
  JobType.FULL_TIME,
  JobType.PART_TIME,
  JobType.REMOTE,
  JobType.INTERNSHIP,
]);

const CompanySchema = z.object({
  name: z.string().min(1, { message: "field is required" }).optional(),
  description: z.string().optional(),
  contactEmail: z
    .string()
    .email({ message: "invalid email address" })
    .optional(),
  contactPhone: z.string().min(1, { message: "field is required" }).optional(),
});

const JobPayloadSchema = z.object({
  title: z.string().min(1, { message: "field is required" }),
  type: jobTypes,
  location: z.string().min(1, { message: "field is required" }),
  description: z.string().min(1, { message: "field is required" }),
  salary: z.string().min(1, { message: "field is required" }),
  company: CompanySchema,
});

const UpdateJobPayloadSchema = z.object({
  title: z.string().optional(),
  type: jobTypes.optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  salary: z.string().optional(),
  company: CompanySchema.optional(),
});

export class JobPayloadDto extends createZodDto(JobPayloadSchema) {}
export class UpdateJobDto extends createZodDto(UpdateJobPayloadSchema) {}
