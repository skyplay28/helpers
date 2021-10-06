export type compose = typeof compose
export function compose<T extends ((arg: any) => any)[]>(
    ...funcs: T
): (arg: Parameters<T[Decrement<GetLength<T>>]>[0]) => ReturnType<T[0]> {
    return funcs.reduce(function (f, g) {
        return function (this: any, arg: T) {
            return f(g.apply(this, [arg]))
        }
    })
}

type GetLength<T extends any[]> = T extends { length: infer L } ? L : never

type Decrement<N extends number> = [
    -1,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19
][N]
