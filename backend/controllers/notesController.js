const db = require('../db')

exports.getNotes = async (req, res) => {
    try {
        const data = await db.query(`
            SELECT users.userid, users.email ,notes.noteid, notes.text FROM users_notes
            INNER JOIN users on users.userid = users_notes.userid
            INNER JOIN notes on notes.noteid= users_notes.noteid;
        `)
        res.send(data.rows).status(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

exports.postNotes = async (req, res) => {
    try {
        const { text } = req.body
        const email = req.email

        if (text.length > 300) { return sendStatus(400) }

        const data = await db.query(`INSERT INTO Notes(text) VALUES ($1) RETURNING noteId;`, [text])
        const noteId = data.rows[0].noteid

        const userId_obj = await db.query(`SELECT * FROM Users WHERE email = $1;`, [email])
        const userId = userId_obj.rows[0].userid

        await db.query(`INSERT INTO users_notes(noteId, userId) VALUES ($1, $2)`, [noteId, userId])

        res.send(data.rows).status(201)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

exports.deleteNote = async (req, res) => {
    const userid = req.userid
    const noteid = req.params.id

    const data = await db.query(`
        SELECT * FROM users_notes
        WHERE noteid = $1 AND userid = $2;
    `, [noteid, userid])

    if (data.rowCount === 0)
        return res.sendStatus(400)

    await db.query(
        `DELETE FROM users_notes WHERE userId = $1 AND noteId = $2`,
        [userid, noteid]
    )

    await db.query(
        `DELETE FROM notes WHERE noteId = $1`,
        [noteid]
    )


    res.sendStatus(200)
}


exports.editNote = async (req, res) => {
    try {
        const userid = req.userid
        const noteid = req.params.id
        const { text } = req.body

        const data = await db.query(`
            SELECT * FROM users_notes
            WHERE noteid = $1 AND userid = $2;
        `, [noteid, userid])

        if (data.rowCount === 0)
            return res.sendStatus(400)

        const result = await db.query(
            `UPDATE Notes SET text = $1 WHERE noteId = $2;`,
            [text, noteid]
        )

        res.sendStatus(200)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}