// Used by the "help" command line command
// Prints the commands supported by the program
export const printAvailableCommands = () => {
  console.log(
    "CREATE - Creates a directory. Must specify full directory path. Example: CREATE fruits/apples"
  )
  console.log(
    "MOVE - Moves the first directory specified to be a child of the second directory. Example: MOVE fruits/tomatoes vegetables"
  )
  console.log(
    "DELETE - Deletes the directory specified. Example: DELETE fruits/bananas"
  )
  console.log("LIST - Lists the full directory structure")
}
