import { compilePack } from '@foundryvtt/foundryvtt-cli'

await compilePack(
  `src/packs/demo/adventure`,
  `dist/demo`,
  { yaml: true, log: true },
)
