import { AuthError } from './auth';

export const errorResponse = (err, res) =>{
    if (err instanceof AuthError) {
        return res.status(401).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
}