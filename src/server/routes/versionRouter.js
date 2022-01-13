/* eslint-disable consistent-return */
import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

export const getVersion = async (req, res) => {
  const files = ['COMMITHASH', 'LASTCOMMITDATETIME', 'VERSION'];
  const result = {};
  files.forEach((file) => {
    const filePath = path.join('public', 'assets', file);
    const key = file.toLocaleLowerCase();
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      result[key] = data;
    } catch (err) {
      result[key] = '';
    }
  });
  res.json(result);
};

router.get('/version', getVersion);

export default router;
