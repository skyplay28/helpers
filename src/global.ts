import * as _ from '.'
declare function globalify(...args: any[]): any
globalify(_)

declare global {
    type bind = _.bind
    function bind<T extends Function>(
        target: object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<T>
    ): TypedPropertyDescriptor<T> | void

    type compose = _.compose
    const compose: typeof _.compose

    type enumerable = _.enumerable
    const enumerable: typeof _.enumerable

    type hidden = _.hidden
    const hidden: typeof _.hidden

    type plain = _.plain
    const plain: typeof _.plain

    type plains = _.plains
    const plains: typeof _.plains

    const toPlainFilters: typeof _.toPlainFilters

    type propertyDecorator = _.propertyDecorator
    const propertyDecorator: typeof _.propertyDecorator

    function sleep(time: number): void

    type optional<T> = _.optional<T>
    const optional: typeof _.optional

    type nullable<T> = _.nullable<T>
    const nullable: typeof _.nullable

    type Class<
        T extends { new (...args: any[]): InstanceType<T> } = {
            new (...args: any[]): any
        }
    > = _.Class<T>

    type Mutable<T> = _.Mutable<T>
    type mutable = _.mutable
    const mutable: typeof _.mutable
}
