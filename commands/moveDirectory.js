import { readDirectories } from "../state.js"

export const moveDirectory = params => {
  const directoryPathToMove = params[0]
  const newParentDirectoryPath = params[1]
  if (!directoryPathToMove || !newParentDirectoryPath) {
    throw new Error(
      "Source or destination directory paths not specified in MOVE"
    )
  }
  const sourcePieces = directoryPathToMove.split("/")
  const destinationPieces = newParentDirectoryPath.split("/")
  const directories = readDirectories()

  // Traverse the directory structure to get to the parent of the
  // directory we want to move
  let sourceDirectoryTracker = directories
  for (let i = 0; i < sourcePieces.length - 1; i++) {
    const sourcePiece = sourcePieces[i]
    if (!sourceDirectoryTracker[sourcePiece]) {
      console.error(
        `Cannot move ${directoryPathToMove} - ${sourcePiece} does not exist`
      )
      return
    }
    sourceDirectoryTracker = sourceDirectoryTracker[sourcePiece]
  }

  const directoryNameToMove = sourcePieces[sourcePieces.length - 1]
  const tempDirectory = sourceDirectoryTracker[directoryNameToMove]
  if (!tempDirectory) {
    console.error(
      `Cannot move ${directoryPathToMove} - ${directoryNameToMove} does not exist`
    )
    return
  }

  // Traverse the directory structure to get to the location we
  // want to move the directory to
  let destinationDirectoryTracker = directories
  destinationDirectoryTracker = directories
  for (let i = 0; i < destinationPieces.length; i++) {
    const destinationPiece = destinationPieces[i]
    if (!destinationDirectoryTracker[destinationPiece]) {
      console.error(
        `Cannot move to ${newParentDirectoryPath} - ${destinationPiece} does not exist`
      )
      return
    }
    destinationDirectoryTracker = destinationDirectoryTracker[destinationPiece]
  }

  // Remove the directory from the source and add it to the destination
  delete sourceDirectoryTracker[directoryNameToMove]
  destinationDirectoryTracker[directoryNameToMove] = tempDirectory
}
