package com.hefti.rpgzume.util;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PdfGenerate {

    @Autowired
    PdfBoxGenerate pdfBoxGenerate;

    public void generatePdf(JSONArray jsonArray, String type) {
        pdfBoxGenerate.generatePdf(jsonArray, type);
    }
}
