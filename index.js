import { printAvailableCommands } from "./commands/utils.js"
import fs from "fs"
import { runCommand } from "./commands/index.js"

// Main runner for the program. Parses input and runs the provided commands.
const run = () => {
  if (process.argv.length < 3) {
    console.error(
      "Usage: provide the location of the file containing the commands to be run, or 'help' to show available commands"
    )
    return
  }
  if (process.argv[2] === "help") {
    printAvailableCommands()
    return
  }
  const fileLocation = process.argv[2]
  let commands = []
  try {
    const commandsData = fs.readFileSync(fileLocation, "utf8")
    commands = commandsData.split("\n")
  } catch (err) {
    console.error(`Could not read commands file. Error: ${err}`)
  }
  try {
    for (const command of commands) {
      runCommand(command)
    }
  } catch (err) {
    console.error(`Failed to run all commands. Error: ${err}`)
  }
}

run()
