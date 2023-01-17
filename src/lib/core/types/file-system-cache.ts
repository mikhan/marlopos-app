import { readFile, writeFile, mkdir } from 'node:fs/promises'
import {} from 'node:fs'
import { resolve, join } from 'node:path'
import process from 'node:process'
import { pathExists } from '$lib/core/utils/file-system'

export class FileSystemCache {
  protected storagePath: string
  private storageCreated = false

  constructor(storagePath: string) {
    this.storagePath = resolve(process.cwd(), storagePath)
  }

  public async get(filename: string): Promise<Buffer | undefined> {
    const filePath = await this.getFilePath(filename)
    const exists = await pathExists(filePath)

    return exists ? await readFile(filePath) : undefined
  }

  public async set(filename: string, value: Buffer): Promise<void> {
    const filePath = await this.getFilePath(filename)
    await writeFile(filePath, value)
  }

  protected async getFilePath(filename: string) {
    if (!this.storageCreated) {
      await mkdir(this.storagePath, { recursive: true })
      this.storageCreated = true
    }

    return join(this.storagePath, filename)
  }
}
