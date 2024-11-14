import { readDirectories } from "../state.js"

// Processes the "LIST" command
// Takes no parameters. Prints a formatted representation
// of the current state of the directories.
export const listDirectories = () => {
  const directories = readDirectories()
  printDirectories(directories, "")
}

const printDirectories = (directories, offset) => {
  for (const directoryName of getSortedDirectoryNames(directories)) {
    console.log(`${offset}${directoryName}`)
    printDirectories(directories[directoryName], `${offset}  `)
  }
}

const getSortedDirectoryNames = directories => {
  const directoryNames = Object.keys(directories)
  return directoryNames.sort()
}
