// This serves as our in-memory data store.
// In a real-world application that would need to persist data across multiple runs,
// this could be replaced with a database.
// But for our purposes, an ephemeral in-memory store is sufficient.

let DIRECTORIES = {}

export const readDirectories = () => {
    return DIRECTORIES
}

export const writeDirectories = (newDirectories) => {
    DIRECTORIES = newDirectories
}