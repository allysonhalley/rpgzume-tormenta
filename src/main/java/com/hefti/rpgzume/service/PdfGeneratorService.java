package com.hefti.rpgzume.service;

import com.hefti.rpgzume.util.FeaturePdfGenerator;
import com.hefti.rpgzume.util.MagicPdfGenerator;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PdfGeneratorService {

    @Autowired
    FeaturePdfGenerator featurePdfGenerator;

    @Autowired
    MagicPdfGenerator magicPdfGenerator;

    // Chama o gerador de PDF
    public void generateFeaturePdf(JSONArray featuresJSONArray)  throws JSONException {
        featurePdfGenerator.generateFeaturesPdf(featuresJSONArray);
    }

    // Chama o gerador de PDF
    public void generateMagicPdf(JSONArray magicsJSONArray)  throws JSONException {
        magicPdfGenerator.generateMagicsPdf(magicsJSONArray);
    }
}
