const db = require('../db')
const jwt = require('jsonwebtoken')
const validator = require('validator')

exports.verifyToken = (req, res, next) => {
    try {
        console.log("verifying...")
        const headerData = req.header('Authorization')
        const token = headerData.split(" ")[1]

        const decoded = jwt.verify(token, 'tajnykluc123')
        req.email = decoded.email
        req.userid = decoded.userid

        next()

    } catch (e) {
        console.log(e)
        res.sendStatus(401)
    }
}

exports.postEmail = async (req, res) => {
    const { email } = req.params
    if (!email) return res.sendStatus(400)
    if (!validator.isEmail(email)) {
        console.log("bad mail")
        return res.status(400).json({ error: "Invalid email format" })
    }
    let userid

    await db.query(`
        CREATE TABLE IF NOT EXISTS Notes
            (
                noteId SERIAL PRIMARY KEY,
                text VARCHAR(300) NOT NULL
            );

        CREATE TABLE IF NOT EXISTS Users
        (
            userId SERIAL PRIMARY KEY,
            email VARCHAR(100) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS users_notes
        (
            noteId INT NOT NULL,
            userId INT NOT NULL,
            PRIMARY KEY(noteId, userId),
            FOREIGN KEY(noteId) REFERENCES Notes(noteId),
            FOREIGN KEY(userId) REFERENCES Users(userId)
        );
    `)

    const data = await db.query(`SELECT * FROM Users WHERE email = $1`, [email])

    if (data.rowCount === 0) {
        const res = await db.query(`INSERT INTO Users(email) VALUES ($1) RETURNING userId;`, [email])
        console.log(res.rows[0])
        userid = res.rows[0].userid
    } else
        userid = data.rows[0].userid

    console.log("logged as ", email)
    console.log("id as ", userid)

    const token = jwt.sign({ email, userid }, 'tajnykluc123', { expiresIn: '1h' })
    res.json({ token, userid })
}

exports.getSetup = ('/setup', async (req, res) => {
    console.log("SETUP DB")
    try {
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})