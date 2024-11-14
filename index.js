import { printAvailableCommands } from "./commands/utils.js"
import fs from "fs"
import { runCommand } from "./commands/index.js"

const run = () => {
  console.log("Starting Directories...")
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
  for (const command of commands) {
    runCommand(command)
  }
  console.log("Finished Directories")
}

run()
