import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { Assert } from '../../assert/index'

describe('value/create/Intersect', () => {
  it('Should create value', () => {
    const T = Type.Intersect([Type.Object({ x: Type.Number() }), Type.Object({ y: Type.Number() })])
    const R = Value.Create(T)

    Assert.deepEqual(R, { x: 0, y: 0 })
  })
  it('Should create value with default', () => {
    const T = Type.Intersect([Type.Object({ x: Type.Number({ default: 100 }) }), Type.Object({ y: Type.Number({ default: 200 }) })])
    const R = Value.Create(T)
    Assert.deepEqual(R, { x: 100, y: 200 })
  })
  it('Should create for overlapping intersection', () => {
    const T = Type.Intersect([Type.Object({ x: Type.Number() }), Type.Object({ x: Type.Number(), y: Type.Number() })])
    const R = Value.Create(T)
    Assert.deepEqual(R, { x: 0, y: 0 })
  })
  it('Should create with last intersected overlapping default', () => {
    const T = Type.Intersect([Type.Object({ x: Type.Number({ default: 1 }) }), Type.Object({ x: Type.Number({ default: 2 }), y: Type.Number() })])
    const R = Value.Create(T)
    Assert.deepEqual(R, { x: 2, y: 0 })
  })
  it('Should throw for non-constructable intersection 1', () => {
    const T = Type.Intersect([Type.Object({ x: Type.Number() }), Type.Object({ x: Type.String() })])
    Assert.throws(() => Value.Create(T))
  })
  it('Should throw for non-constructable intersection 2', () => {
    const T = Type.Intersect([Type.String(), Type.Number()])
    Assert.throws(() => Value.Create(T))
  })
  it('Should not throw for non-constructable intersection with default', () => {
    const T = Type.Intersect([Type.String(), Type.Number()], { default: 'hello' })
    const R = Value.Create(T)
    Assert.deepEqual(R, 'hello')
  })
})
