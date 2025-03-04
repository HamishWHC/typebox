import { TypeGuard } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { Assert } from '../../assert/index'

describe('type/normalize/Intersect', () => {
  it('Normalize 1', () => {
    const T = Type.Intersect([Type.Number(), Type.String()])
    const R = TypeGuard.TIntersect(T)
    Assert.IsTrue(R)
  })
  it('Normalize 2', () => {
    const T = Type.Intersect([Type.Number()])
    const R = TypeGuard.TNumber(T)
    Assert.IsTrue(R)
  })
  it('Normalize 3', () => {
    const T = Type.Intersect([])
    const R = TypeGuard.TNever(T)
    Assert.IsTrue(R)
  })
})
