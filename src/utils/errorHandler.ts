import { Request, Response, NextFunction } from 'express';

const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(error);

    if (res.headersSent) {
        return next(error);
    }

    if (error instanceof SyntaxError) {
        return res.status(400).json({ error: 'Invalid JSON' });
    }


    return res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;
