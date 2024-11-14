import { readDirectories } from "../state.js"

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
