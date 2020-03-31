const { resolve } = require('path')
const express = require('express')

const PORT = process.env.PORT || 5001

const app = express()

const DIST_DIR = resolve(__dirname, 'dist')

app.use(express.static(DIST_DIR))

app.get('*', (req, res) => {
	res.sendFile(resolve(DIST_DIR, 'index.html'))
})

app.listen(PORT)