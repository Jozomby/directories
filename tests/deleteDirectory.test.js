import { deleteDirectory } from "../commands/deleteDirectory"
import { readDirectories, writeDirectories } from "../state"

beforeEach(() => {
  writeDirectories({})
})

test("can delete a top level directory without children", () => {
  writeDirectories({ animals: {} })
  const params = ["animals"]
  deleteDirectory(params)
  const updatedDirectories = readDirectories()
  const expectedDirectories = {}
  expect(updatedDirectories).toEqual(expectedDirectories)
})

test("can delete a nested directory", () => {
  writeDirectories({ animals: { felines: {} } })
  const params = ["animals/felines"]
  deleteDirectory(params)
  const updatedDirectories = readDirectories()
  const expectedDirectories = { animals: {} }
  expect(updatedDirectories).toEqual(expectedDirectories)
})
test("deleting a directory with children deletes the children too", () => {
  writeDirectories({ animals: { felines: { tigers: {} } } })
  const params = ["animals/felines"]
  deleteDirectory(params)
  const updatedDirectories = readDirectories()
  const expectedDirectories = { animals: {} }
  expect(updatedDirectories).toEqual(expectedDirectories)
})
test("cannot delete a directory that does not exist", () => {
  writeDirectories({ animals: { felines: {} } })
  const params = ["animals/canines"]
  deleteDirectory(params)
  const updatedDirectories = readDirectories()
  const expectedDirectories = { animals: { felines: {} } }
  expect(updatedDirectories).toEqual(expectedDirectories)
})
