// export const numCPUs = os.cpus().length;
import { availableParallelism } from 'node:os';

export const numCPUs = availableParallelism();
