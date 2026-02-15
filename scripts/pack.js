import { compilePack } from '@foundryvtt/foundryvtt-cli'

await compilePack(
  `src/packs/demo/adventure`,
  `dist/packs/demo`,
  { yaml: true, log: true },
)
