import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import {extractTextFromPdf} from './pdfExtractor.js';

export const extractTextFromDocument=async(filepath)=>{
    const ext=path.extname(filepath).toLowerCase();
    if(ext===".pdf"){
        return await extractTextFromPdf(filepath);
    }

    if(ext===".txt"){
        return fs.readFileSync(filepath,"utf-8");
    }

    if(ext===".docx"){
        const result=await mammoth.extractRawText({path:filepath});
        return result.value;
    }
    
    throw new Error("Unsupported file type");
}