import conn from "../../../lib/db";
import { getAuthUserId } from "../../../lib/auth";
import { Role } from "../../../lib/constants";
import { errorResponse } from "../../../lib/errorResponse";

export default function handler(req, res) {
    const accessTo = Role.Gamer;

    const results = {
        verb: "Cocinar",
        sentence: "Ellos XXX",
        options: ['cocinan', 'cocinamos', 'cocino']
    }

    res.status(200).json(results)

}