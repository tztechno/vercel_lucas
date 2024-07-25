import { NextApiRequest, NextApiResponse } from 'next';

const calculateLucasNumber2 = (n: number): number => {
    if (n === 0) return 2;
    if (n === 1) return 1;
    let a = 2, b = 1, c = 0;
    for (let i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    return c;
};

const calculateLucasNumber = (n: number): number => {
    if (n === 0) return 2;
    if (n === 1) return 1;
    return calculateLucasNumber(n - 1) + calculateLucasNumber(n - 2);
};

export default (req: NextApiRequest, res: NextApiResponse) => {
    const start = process.hrtime();
    const { value } = req.body;
    const result = calculateLucasNumber(value);
    const end = process.hrtime(start);
    const duration = end[0] + end[1] / 1e9; // seconds
    res.status(200).json({ result, duration });
};
