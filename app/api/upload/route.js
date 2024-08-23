import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';

// Configure multer
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Images only!'));
    }
  }
});

export async function POST(req) {
  return new Promise((resolve, reject) => {
    upload.single('image')(req, {}, (err) => {
      if (err) {
        resolve(NextResponse.json({ error: err.message }, { status: 400 }));
      } else {
        if (req.file === undefined) {
          resolve(NextResponse.json({ error: 'No File Selected!' }, { status: 400 }));
        } else {
          resolve(NextResponse.json({ filePath: `/uploads/${req.file.filename}` }));
        }
      }
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
