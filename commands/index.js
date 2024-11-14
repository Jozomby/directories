import { createDirectory } from "./createDirectory.js"
import { moveDirectory } from "./moveDirectory.js"
import { deleteDirectory } from "./deleteDirectory.js"
import { listDirectories } from "./listDirectories.js"

const COMMANDS = {
  create: createDirectory,
  move: moveDirectory,
  delete: deleteDirectory,
  list: listDirectories
}

// Takes a command string such as "CREATE fruits/apples"
// and finds the correct function to run that command, and runs it
export const runCommand = command => {
  console.log(command)
  const commandPieces = command.split(" ")
  const commandName = commandPieces[0]
  const commandParams = commandPieces.slice(1)
  const commandFunction = COMMANDS[commandName.toLowerCase()]
  if (!commandFunction) {
    throw new Error("Unknown command specified")
  }

  commandFunction(commandParams)
}
