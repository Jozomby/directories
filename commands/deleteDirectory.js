import { readDirectories } from "../state.js"

export const deleteDirectory = params => {
  const directoryPath = params[0]
  if (!directoryPath) {
    throw new Error("Directory path not specified in DELETE")
  }
  const pathPieces = directoryPath.split("/")
  const directories = readDirectories()
  let directoryTracker = directories

  // Traverse the directory structure to get to the parent of the
  // directory we want to delete
  for (let i = 0; i < pathPieces.length - 1; i++) {
    const pathPiece = pathPieces[i]
    if (!directoryTracker[pathPiece]) {
      console.error(
        `Cannot delete ${directoryPath} - ${pathPiece} does not exist`
      )
      return
    }
    directoryTracker = directoryTracker[pathPiece]
  }

  const directoryNameToDelete = pathPieces[pathPieces.length - 1]
  if (!directoryTracker[directoryNameToDelete]) {
    console.error(
      `Cannot delete ${directoryPath} - ${directoryNameToDelete} does not exist`
    )
    return
  }
  delete directoryTracker[directoryNameToDelete]
}
