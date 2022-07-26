import IORedis from "ioredis";

export interface CacheRepositoryInterface {
    save(key: string, value: any): Promise<IORedis.Ok | null>
    saveExpiration(key: string, value: any, ttl: number): Promise<IORedis.Ok | null>
    find(key: string): Promise<any>
    delete(key: string): Promise<boolean>
}