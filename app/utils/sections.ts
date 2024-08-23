import fs from 'fs'
import path from 'path'

import { fileURLToPath } from 'url'



// Construct __dirname from import.meta.url
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Function to recursively find all JSON files matching a specific name in a directory
function findJsonFiles(dir: string, filename: string) {
	let results: string[] = []

	// Read all files and directories in the current directory
	const list = fs.readdirSync(dir)

	list.forEach((file) => {
		const filePath = path.join(dir, file)
		const stat = fs.statSync(filePath)

		// If it's a directory, recursively search inside it
		if (stat && stat.isDirectory()) {
			results = results.concat(findJsonFiles(filePath, filename))
		} else if (file === filename) {
			// If it's the specific JSON file, add it to the results
			results.push(filePath)
		}
	})

	return results
}

// Directory to start searching from
const baseDir = path.join(__dirname, '../components/lib')

// Filename to match
const filename = 'schema.json'

// Find all JSON files matching the filename in the directory and its subdirectories
const jsonFiles = findJsonFiles(baseDir, filename)

export function getSections() {
	// Process each JSON file
	return jsonFiles.map((filePath) => fs.readFileSync(filePath, 'utf8'))
}

