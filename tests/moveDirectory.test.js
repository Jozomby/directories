import { moveDirectory } from "../commands/moveDirectory"
import { readDirectories, writeDirectories } from "../state"

beforeEach(() => {
  writeDirectories({})
})

test("can move a top level directory without children to underneath another top level directory", () => {
  writeDirectories({ animals: {}, plants: {} })
  const params = ["animals", "plants"]
  moveDirectory(params)
  const updatedDirectories = readDirectories()
  const expectedDirectories = { plants: { animals: {} } }
  expect(updatedDirectories).toEqual(expectedDirectories)
})

test("can move a top level directory with children to underneath another top level directory", () => {
  writeDirectories({ animals: { felines: {} }, plants: {} })
  const params = ["animals", "plants"]
  moveDirectory(params)
  const updatedDirectories = readDirectories()
  const expectedDirectories = { plants: { animals: { felines: {} } } }
  expect(updatedDirectories).toEqual(expectedDirectories)
})

test("can move a top level directory to underneath a nested directory", () => {
  writeDirectories({ animals: {}, plants: { dicots: {} } })
  const params = ["animals", "plants/dicots"]
  moveDirectory(params)
  const updatedDirectories = readDirectories()
  const expectedDirectories = { plants: { dicots: { animals: {} } } }
  expect(updatedDirectories).toEqual(expectedDirectories)
})

test("can move a nested directory", () => {
  writeDirectories({ animals: { felines: {} }, plants: {} })
  const params = ["animals/felines", "plants"]
  moveDirectory(params)
  const updatedDirectories = readDirectories()
  const expectedDirectories = { animals: {}, plants: { felines: {} } }
  expect(updatedDirectories).toEqual(expectedDirectories)
})

test("cannot move a directory that does not exist", () => {
  writeDirectories({ animals: {}, plants: {} })
  const params = ["fungi", "plants"]
  moveDirectory(params)
  const updatedDirectories = readDirectories()
  const expectedDirectories = { animals: {}, plants: {} }
  expect(updatedDirectories).toEqual(expectedDirectories)
})

test("cannot move a directory to underneath a location that does not exist", () => {
  writeDirectories({ animals: {}, plants: {} })
  const params = ["animals", "fungi"]
  moveDirectory(params)
  const updatedDirectories = readDirectories()
  const expectedDirectories = { animals: {}, plants: {} }
  expect(updatedDirectories).toEqual(expectedDirectories)
})
