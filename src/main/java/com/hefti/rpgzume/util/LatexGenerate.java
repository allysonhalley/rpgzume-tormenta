package com.hefti.rpgzume.util;

import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.stereotype.Component;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

/**
 * Classe responsável por gerar o arquivo LaTeX com base nos dados fornecidos.
 */
@Component
public class LatexGenerate {

    /**
     * Gera um arquivo LaTeX baseado em um JSONArray de talentos.
     *
     * @param jsonArray  Array JSON contendo os dados de talentos.
     * @param outputPath Caminho para salvar o arquivo LaTeX gerado.
     * @return Arquivo LaTeX gerado.
     * @throws IOException  Se ocorrer um erro ao escrever o arquivo.
     * @throws JSONException Se o JSON estiver malformado.
     */
    public File generateLatexFile(JSONArray jsonArray, String outputPath) throws IOException, JSONException {
        File texFile = new File(outputPath);
        texFile.getParentFile().mkdirs();

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(texFile))) {
            // Construir conteúdo LaTeX
            String latexContent = buildLatexContent(jsonArray);
            writer.write(latexContent);
        }

        return texFile;
    }

    /**
     * Constrói o conteúdo do documento LaTeX com base nos dados fornecidos.
     *
     * @param jsonArray Array JSON contendo os dados de talentos.
     * @return Conteúdo do documento LaTeX.
     * @throws JSONException Se o JSON estiver malformado.
     */
    private String buildLatexContent(JSONArray jsonArray) throws JSONException {
        StringBuilder latexBuilder = new StringBuilder();

        // Início do documento LaTeX
        latexBuilder.append("\\documentclass[a4paper,10pt]{article}\n")
                .append("\\usepackage[utf8]{inputenc}\n")
                .append("\\usepackage[margin=1cm]{geometry}\n")
                .append("\\usepackage{multicol}\n")
                .append("\\begin{document}\n")
                .append("\\section*{Talentos de RPG}\n")
                .append("\\begin{multicols}{2}\n");

        // Adicionar talentos como cards
        for (int i = 0; i < jsonArray.length(); i++) {
            var talent = jsonArray.getJSONObject(i);
            var card = talent.getJSONObject("card");

            latexBuilder.append("\\fbox{\\parbox{0.45\\textwidth}{\n")
                    .append("\\textbf{Nome:} ").append(card.getString("name")).append("\\\\\n")
                    .append("\\textbf{Resumo:} ").append(card.getString("resume")).append("\\\\\n")
                    .append("\\textbf{Descrição:} ").append(card.getString("description")).append("\\\\\n")
                    .append("\\textbf{Fonte:} ").append(card.getString("book"))
                    .append(" - Página ").append(card.getInt("page")).append("\\\\\n")
                    .append("\\textbf{Pré-requisitos:} ").append(talent.getString("prerequisites")).append("\\\\\n")
                    .append("\\textbf{Benefício:} ").append(talent.getString("benefit")).append("\\\\\n")
                    .append("\\textbf{Normal:} ").append(talent.getString("normal")).append("\\\\\n")
                    .append("\\textbf{Especial:} ").append(talent.getString("special")).append("\\\\\n")
                    .append("}}\\\n\\vspace{0.5cm}\n");
        }

        // Fim do documento LaTeX
        latexBuilder.append("\\end{multicols}\n")
                .append("\\end{document}\n");

        return latexBuilder.toString();
    }
}