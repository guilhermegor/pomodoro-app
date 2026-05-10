import { CreateTaskDto } from '../domain/dto';
import { TaskModel } from '../domain/entities';
import { CycleType } from '../domain/enums';

export function createTask(
  dto: CreateTaskDto,
  type: CycleType,
  duration: number,
): TaskModel {
  return {
    id: crypto.randomUUID(),
    name: dto.name,
    startDate: Date.now(),
    completeDate: null,
    interruptDate: null,
    duration,
    type,
  };
}