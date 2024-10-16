// authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { env } from '@/common/utils/envConfig';

// Ganti dengan secret key Anda

// Tipe untuk payload JWT yang didecode
interface JwtPayload {
    id: string; // Sesuaikan dengan payload yang Anda gunakan
    // Tambahkan properti lain sesuai kebutuhan
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Ambil token dari header
    const token = req.headers['authorization']?.split(' ')[1];

    // Jika tidak ada token
    if (!token) {
        return res.status(StatusCodes.FORBIDDEN).json({code: StatusCodes.FORBIDDEN, message: 'Token not found!' });
    }

    // Verifikasi token
    jwt.verify(token, env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(StatusCodes.UNAUTHORIZED).json({code: StatusCodes.UNAUTHORIZED, message: 'Invalid token!' });
        }

        // Simpan informasi pengguna ke dalam request
        req.user = decoded as JwtPayload;
        next();
    });
};

