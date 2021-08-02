export type nullable<T> = T | null
export function nullable<T>(value?: T | null): T | null {
    if (value === undefined) {
        return null
    }

    return value
}

export type optional<T> = T | undefined
export function optional<T>(value?: T): typeof value {
    return value
}

export type Class<
    T extends { new (...args: any[]): InstanceType<T> } = {
        new (...args: any[]): any
    }
> = {
    new (...args: ConstructorParameters<T>): InstanceType<T>
}
