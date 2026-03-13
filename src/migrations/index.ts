import * as migration_20251009_155501_initial from './20251009_155501_initial';
import * as migration_20260313_081915 from './20260313_081915';

export const migrations = [
  {
    up: migration_20251009_155501_initial.up,
    down: migration_20251009_155501_initial.down,
    name: '20251009_155501_initial',
  },
  {
    up: migration_20260313_081915.up,
    down: migration_20260313_081915.down,
    name: '20260313_081915'
  },
];
