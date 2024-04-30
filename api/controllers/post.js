import { db } from "../connect.js"

export const getPosts = (req, res) => {
    const q = `SELECT p.*, u.id AS userid, name, proficPic FROM posts AS p JOIN users AS u ON (u.id = p.userid)`;

    db.query(q, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json(data);
    });
}