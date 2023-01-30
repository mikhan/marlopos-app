import { access } from 'node:fs/promises'
import { constants } from 'node:fs'

export async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path, constants.R_OK | constants.W_OK)
    return true
  } catch {
    return false
  }
}
