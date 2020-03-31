export function download(filename, encodedUri) {
	const link = document.createElement('a')
	link.setAttribute('href', encodedUri)
	link.setAttribute('download', filename)

	document.body.append(link)

	link.click()
	link.remove()
}