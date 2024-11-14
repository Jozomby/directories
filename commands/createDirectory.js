import { readDirectories, writeDirectories } from "../state.js"

// Processes the "CREATE" command
// Expects a single value in `params` specifying the path
// of the directory to be created
export const createDirectory = params => {
  const newDirectoryPath = params[0]
  if (!newDirectoryPath) {
    throw new Error("Directory path not specified in CREATE")
  }
  const pathPieces = newDirectoryPath.split("/")
  const directories = readDirectories()

  // For each part of the path to the new directory, create it
  // in our directory structure if it does not exist yet
  let currentDirectoryLocation = directories
  for (const pathPiece of pathPieces) {
    if (!currentDirectoryLocation[pathPiece]) {
      currentDirectoryLocation[pathPiece] = {}
    }
    currentDirectoryLocation = currentDirectoryLocation[pathPiece]
  }
  writeDirectories(directories)
}
