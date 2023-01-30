import { FileSystemCache } from './file-system-cache'

export class JsonCache extends FileSystemCache {
  public override async get<T extends object>(key: string): Promise<T | undefined> {
    const value = await super.get(key)

    return value ? JSON.parse(value.toString()) : undefined
  }

  public override async set<T extends object>(key: string, value: T): Promise<void> {
    const content = JSON.stringify(value, null, 2)
    await super.set(key, Buffer.from(content))
  }

  protected override getFilePath(key: string) {
    return super.getFilePath(`${key}.json`)
  }
}
