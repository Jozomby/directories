import { createDirectory } from "../commands/createDirectory"
import { readDirectories, writeDirectories } from "../state"

beforeEach(() => {
  writeDirectories({})
})

test("can create top level directory", () => {
  const params = ["animals"]
  createDirectory(params)
  const updatedDirectories = readDirectories()
  const expectedDirectories = { animals: {} }
  expect(updatedDirectories).toEqual(expectedDirectories)
})

test("can create a directory inside an existing directory", () => {
  writeDirectories({ animals: {} })
  const params = ["animals/felines"]
  createDirectory(params)
  const updatedDirectories = readDirectories()
  const expectedDirectories = { animals: { felines: {} } }
  expect(updatedDirectories).toEqual(expectedDirectories)
})
test("creating a nested directory when multiple pieces of the path don't exist creates all parts of the path", () => {
  const params = ["animals/felines"]
  createDirectory(params)
  const updatedDirectories = readDirectories()
  const expectedDirectories = { animals: { felines: {} } }
  expect(updatedDirectories).toEqual(expectedDirectories)
})
test("creating a directory that already exists doesn't remove the existing children of that directory", () => {
  writeDirectories({ animals: { felines: {} } })
  const params = ["animals"]
  createDirectory(params)
  const updatedDirectories = readDirectories()
  const expectedDirectories = { animals: { felines: {} } }
  expect(updatedDirectories).toEqual(expectedDirectories)
})
