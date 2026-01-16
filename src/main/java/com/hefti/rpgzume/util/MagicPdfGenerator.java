package com.hefti.rpgzume.util;


import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MagicPdfGenerator {

    @Autowired
    PdfGenerate pdfGenerate;

    public void generateMagicsPdf(JSONArray jsonArray) throws JSONException {
        pdfGenerate.generatePdf(jsonArray, "Magic");
    }
}
