export const toLogFilters: ((arg: any) => any)[] = []

export type toLog = typeof toLog
export function toLog<T extends any[]>(...args: T): T {
    if (args.length === 0) {
        return ([] as any) as T
    }
    ++stack
    const result = args.map(arg => {
        if (arg == null) {
            return arg
        }
        if (typeof arg !== 'object') {
            return applyFilters(arg)
        }

        if (already.has(arg)) {
            return already.get(arg)
        }
        const result: any = {}
        already.set(arg, result)
        arg = applyFilters(arg)

        if (Array.isArray(arg)) {
            return arg.map(arg => toLog(arg)[0])
        }

        Object.getOwnPropertyNames(arg).forEach(key => {
            if (getVisibility(arg, key)) {
                result[key] = toLog(arg[key])[0]
            }
        })
        getGetters(result, arg, arg)
        return result
    }) as T
    --stack
    if (stack === 0) {
        already.clear()
    }
    return result
}

const already: Map<any, any> = new Map()
let stack = 0

function applyFilters(arg: any) {
    toLogFilters.forEach(filter => {
        arg = filter(arg)
    })
    return arg
}

function getGetters(result: any, obj: any, currentObj: any) {
    const prototype = Object.getPrototypeOf(currentObj)
    if (prototype) {
        getGetters(result, obj, prototype)
    }

    Object.getOwnPropertyNames(currentObj).forEach(key => {
        const descriptor = Object.getOwnPropertyDescriptor(currentObj, key)
        if (descriptor && descriptor.get && getVisibility(obj, key)) {
            result[key] = toLog(descriptor.get.call(obj))[0]
        }
    })
}

function getVisibility(obj: any, propertyKey: string): boolean {
    const prototype = Object.getPrototypeOf(obj)
    if (prototype == null) {
        return true
    }
    const descriptor = Object.getOwnPropertyDescriptor(prototype, propertyKey)
    if (descriptor == null) {
        return getVisibility(prototype, propertyKey)
    }
    if (descriptor.enumerable) {
        return getVisibility(prototype, propertyKey)
    }
    return false
}
