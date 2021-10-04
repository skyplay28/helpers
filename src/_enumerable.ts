export type enumerable = typeof enumerable
export const enumerable = (
    proto: object,
    key: string | symbol,
    propertyDescriptor: PropertyDescriptor
) => {
    propertyDescriptor.enumerable = true
}
