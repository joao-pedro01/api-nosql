import express from "express";
import {connectToDatabase} from "../utils/mongodb.js";

const router = express.Router();
const {db, ObjectId, order} = await connectToDatabase();
const nomeCollection = 'prestadores';

router.get('/', async (req, res) => {
    const {limit, skip, order} = req.query; // obter da URL
    
    try {
        const docs = [];
        await db.collection(nomeCollection)
        .find()
        .limit(parseInt(limit) || 10)
        .skip(parseInt(skip) || 0)
        .sort({order: 1})
        .forEach((doc) => {
           docs.push(doc);
        });

        res.status(200).json(docs);
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao obter a listagem dos prestadores',
            error: `${error.message}`,
            erro: true 
        });
    }
});

export default router;