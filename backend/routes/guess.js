import express from 'express';
import { genNumber } from '../core/getNumber';

const router = express.Router();

const roughScale = (x, base) => {
    let parsed = Number.parseInt(x, base);
    if (Number.isNaN(parsed)) return 0;
    return parsed;
}

router.post('/start', (_, res) => {
    genNumber();
    res.json({ msg: 'The game has started.' });
});

router.get('/guess', (req, res) => {
    const number = genNumber();
    const guessed = roughScale(req.query.number, 10);
    if (!guessed || guessed < 1 || guessed > 100) {
        res.status(406).send({ msg: 'Not a legal number.' });
    } else {
        guessed === number ? 
        res.send({ msg: 'Equal' }) : guessed > number ? 
        res.send({ msg: `${guessed} is Bigger than target` }) : res.send({ msg: `${guessed} is smaller than target` });
    }
});

router.post('/restart', (_, res) => {
    genNumber(true);
    res.json({ msg: '' });
});

export default router;