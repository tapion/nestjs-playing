import { IsEnum } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class ValidateTaskStatusDto {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}