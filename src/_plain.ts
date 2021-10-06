export const toPlainFilters: ((arg: any) => any)[] = []

export type plain = typeof plain
export function plain<T>(arg: T): T {
    ++stack

    if (arg == null) {
        return arg
    }

    if (typeof arg !== 'object') {
        --stack
        return applyFilters(arg)
    }

    if (already.has(arg)) {
        --stack
        return already.get(arg)
    }

    let result: any
    arg = applyFilters(arg)

    if (Array.isArray(arg)) {
        result = arg.map(arg => plain(arg))
        already.set(arg, result)
    } else {
        result = {}
        already.set(arg, result)
        get(result, arg, arg)
    }

    --stack
    if (stack === 0) {
        already = new Map()
    }

    return result
}

export type plains = typeof plains
export function plains<T extends any[]>(...args: T): T {
    return args.map(plain) as T
}

let already: Map<any, any> = new Map()
let stack = 0

function applyFilters(arg: any) {
    toPlainFilters.forEach(filter => {
        arg = filter(arg)
    })
    return arg
}

function get(result: any, obj: any, currentObj: any) {
    const prototype = Object.getPrototypeOf(currentObj)
    if (prototype && prototype !== Object.prototype) {
        get(result, obj, prototype)
    }

    Object.getOwnPropertyNames(currentObj).forEach(key => {
        if (getVisibility(currentObj, key)) {
            result[key] = plain(obj[key as keyof typeof obj])
        }
    })
}

function getVisibility(obj: any, propertyKey: string): boolean {
    const descriptor = Object.getOwnPropertyDescriptor(obj, propertyKey)
    if (descriptor == null) {
        return true
    }
    if (descriptor.enumerable) {
        return true
    }
    return false
}
