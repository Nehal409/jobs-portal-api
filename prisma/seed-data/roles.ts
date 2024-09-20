import { Role } from "src/enums/roles";

export const roles = [
  {
    id: 1,
    name: Role.JOB_SEEKER,
    description: "Job Seeker Role - Can search for and apply to jobs",
  },
  {
    id: 2,
    name: Role.RECRUITER,
    description: "Recruiter - Can add and manage job postings",
  },
];
