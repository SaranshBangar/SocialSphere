import { db } from "../connect.js"
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token)
        return res.status(401).json("Unauthorized");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err)
            return res.status(403).json("Token invalid");

        const q = `SELECT p.*, u.id AS userid, name, proficPic FROM posts AS p JOIN users AS u ON (u.id = p.userid) LEFT JOIN relationships AS r ON (r.followeduserid = p.userid) WHERE r.followeruserid = ? OR p.userid = ?`;

        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
            if (err)
                return res.status(500).json(err);
            return res.status(200).json(data);
        });
    })
}