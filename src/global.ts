import * as _ from '.'
declare function globalify(...args: any[]): any
globalify(_)

declare global {
    type optional<T> = _.optional<T>
    const optional: typeof _.optional
    type nullable<T> = _.nullable<T>
    const nullable: typeof _.nullable
    type Class<
        T extends { new (...args: any[]): InstanceType<T> } = {
            new (...args: any[]): any
        }
    > = _.Class<T>

    type bind = _.bind
    function bind<T extends Function>(
        target: object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<T>
    ): TypedPropertyDescriptor<T> | void

    type hidden = _.hidden
    const hidden: typeof _.hidden

    type propertyDecorator = _.propertyDecorator
    const propertyDecorator: typeof _.propertyDecorator

    function sleep(time: number): void

    const toLogFilters: typeof _.toLogFilters

    type toLog = _.toLog
    const toLog: typeof _.toLog
}
