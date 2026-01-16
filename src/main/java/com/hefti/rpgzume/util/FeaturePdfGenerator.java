package com.hefti.rpgzume.util;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
@Component
public class FeaturePdfGenerator {

    @Autowired
    PdfGenerate pdfGenerate;

    public void generateFeaturesPdf(JSONArray jsonArray) throws JSONException {
        pdfGenerate.generatePdf(jsonArray, "Feature");
    }

}
