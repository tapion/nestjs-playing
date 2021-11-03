import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class FilterTaskDto {
    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;

    @IsNotEmpty()
    @IsOptional()
    search?: string;
}