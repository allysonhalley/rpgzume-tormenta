package com.hefti.rpgzume.util;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Component
public class PdfBoxGenerate {

    public void generatePdf(JSONArray jsonArray, String type) {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage(PDRectangle.A4);
            document.addPage(page);

            PDPageContentStream contentStream = new PDPageContentStream(document, page);

            // Configuração do layout
            float margin = 50;
            float columnWidth = (page.getMediaBox().getWidth() - 3 * margin) / 2;
            float currentY = page.getMediaBox().getHeight() - margin;

            // Adicionar título centralizado na primeira página
            addTitle(contentStream, page, type);
            currentY -= 50; // Espaço reservado para o título

            // Coordenadas iniciais das colunas
            float startXLeft = margin;
            float startXRight = startXLeft + columnWidth + margin;
            boolean useRightColumn = false;

            // Iterar sobre o JSONArray
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObject = jsonArray.getJSONObject(i);

                // Determinar a posição inicial
                float startX = useRightColumn ? startXRight : startXLeft;

                // Determinar a altura necessária para o card
                float requiredHeight = calculateCardHeight(jsonObject, columnWidth);

                // Verificar se há espaço na coluna
                if (currentY - requiredHeight < margin) {
                    // Trocar para a próxima coluna ou criar nova página
                    if (useRightColumn) {
                        contentStream.close();
                        page = new PDPage(PDRectangle.A4);
                        document.addPage(page);
                        contentStream = new PDPageContentStream(document, page);

                        // Adicionar título na nova página
                        addTitle(contentStream, page, type);
                        currentY = page.getMediaBox().getHeight() - margin - 50;
                        useRightColumn = false;
                    } else {
                        useRightColumn = true;
                        currentY = page.getMediaBox().getHeight() - margin - 50; // Considerar o espaço do título
                    }
                    startX = useRightColumn ? startXRight : startXLeft;
                }

                // Desenhar o card
                currentY = drawCard(contentStream, startX, currentY, columnWidth, jsonObject, 10);

                // Alternar para a próxima coluna se necessário
                if (currentY < margin) {
                    useRightColumn = !useRightColumn;
                    currentY = page.getMediaBox().getHeight() - margin - 50; // Considerar o espaço do título
                }
            }

            contentStream.close();

            // Salvar o arquivo na pasta Downloads
            String downloadPath = Paths.get(System.getProperty("user.home"), "Downloads", type+"_cards.pdf").toString();
            document.save(new File(downloadPath));
            System.out.println("PDF gerado com sucesso na pasta Downloads: " + downloadPath);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private float drawCard(PDPageContentStream contentStream, float x, float y, float width, JSONObject cardData, float padding) throws IOException, JSONException {
        // Atributos do card
        String[] attributes = {
                "Título: " + cardData.getJSONObject("card").getString("name"),
                "Resumo: " + cardData.getJSONObject("card").getString("resume"),
                "Descrição: " + cardData.getJSONObject("card").getString("description"),
                "Livro: " + cardData.getJSONObject("card").getString("book") + ", Página: " + cardData.getJSONObject("card").getInt("page"),
                "Tipo: " + cardData.optString("type", "Nenhum"),
                "Nível: " + cardData.optString("level", "Nenhum"),
                "Componentes: " + cardData.optString("components", "Nenhum"),
                "Tempo de Conjuração: " + cardData.optString("castTime", "Nenhum"),
                "Alcance: " + cardData.optString("range", "Nenhum"),
                "Área de Efeito: " + cardData.optString("targetArea", "Nenhum"),
                "Duração: " + cardData.optString("duration", "Nenhum"),
                "Teste de Resistência: " + cardData.optString("savingThrow", "Nenhum"),
                "Resistência à Magia: " + cardData.optString("spellResistance", "Nenhum"),
                "Efeito: " + cardData.optString("effect", "Nenhum")
        };

        // Calcular a altura necessária para o texto diretamente usando calculateCardHeight
        float textHeight = calculateCardHeight(cardData, width);
        float cardHeight = textHeight + 2 * padding;

        // Desenhar o retângulo do card
        contentStream.setLineWidth(1);
        contentStream.addRect(x, y - cardHeight, width, cardHeight);
        contentStream.stroke();

        // Inserir texto dentro do card
        contentStream.beginText();
        contentStream.setFont(PDType1Font.HELVETICA, 10);
        contentStream.newLineAtOffset(x + padding, y - padding);

        for (String attribute : attributes) {
            List<String> lines = wrapText(attribute, PDType1Font.HELVETICA, 10, width - 2 * padding);
            for (String line : lines) {
                contentStream.showText(line);
                contentStream.newLineAtOffset(0, -12);
            }
            contentStream.newLineAtOffset(0, -6); // Espaço entre atributos
        }

        contentStream.endText();

        return y - cardHeight - 10; // Retornar a nova posição Y
    }


    private List<String> wrapText(String text, PDType1Font font, float fontSize, float maxWidth) throws IOException {
        String[] words = text.split(" ");
        StringBuilder line = new StringBuilder();
        float spaceWidth = font.getStringWidth(" ") / 1000 * fontSize;
        float lineWidth = 0;

        List<String> lines = new ArrayList<>();
        for (String word : words) {
            float wordWidth = font.getStringWidth(word) / 1000 * fontSize;

            if (lineWidth + wordWidth + spaceWidth > maxWidth) {
                lines.add(line.toString());
                line = new StringBuilder(word);
                lineWidth = wordWidth;
            } else {
                if (line.length() > 0) {
                    line.append(" ");
                }
                line.append(word);
                lineWidth += wordWidth + spaceWidth;
            }
        }

        if (line.length() > 0) {
            lines.add(line.toString());
        }

        return lines;
    }

    private float calculateCardHeight(JSONObject cardData, float width) throws IOException, JSONException {
        String[] attributes = {
                "Título: " + cardData.getJSONObject("card").getString("name"),
                "Resumo: " + cardData.getJSONObject("card").getString("resume"),
                "Descrição: " + cardData.getJSONObject("card").getString("description"),
                "Livro: " + cardData.getJSONObject("card").getString("book") + ", Página: " + cardData.getJSONObject("card").getInt("page"),
                "Tipo: " + cardData.optString("type", "Nenhum"),
                "Nível: " + cardData.optString("level", "Nenhum"),
                "Componentes: " + cardData.optString("components", "Nenhum"),
                "Tempo de Conjuração: " + cardData.optString("castTime", "Nenhum"),
                "Alcance: " + cardData.optString("range", "Nenhum"),
                "Área de Efeito: " + cardData.optString("targetArea", "Nenhum"),
                "Duração: " + cardData.optString("duration", "Nenhum"),
                "Teste de Resistência: " + cardData.optString("savingThrow", "Nenhum"),
                "Resistência à Magia: " + cardData.optString("spellResistance", "Nenhum"),
                "Efeito: " + cardData.optString("effect", "Nenhum")
        };

        float totalHeight = 0;
        for (String attribute : attributes) {
            List<String> lines = wrapText(attribute, PDType1Font.HELVETICA, 10, width - 20); // Padding ajustado
            totalHeight += lines.size() * 12 + 6; // Altura das linhas + espaçamento
        }
        return totalHeight + 20; // Adicionar padding
    }

    private void addTitle(PDPageContentStream contentStream, PDPage page, String type) throws IOException {
        contentStream.beginText();
        contentStream.setFont(PDType1Font.HELVETICA_BOLD, 16);

        // Centralizar o título na página
        float titleWidth = PDType1Font.HELVETICA_BOLD.getStringWidth(type) / 1000 * 16;
        float startX = (page.getMediaBox().getWidth() - titleWidth) / 2;
        float startY = page.getMediaBox().getHeight() - 50; // 50 unidades abaixo do topo da página

        contentStream.newLineAtOffset(startX, startY);
        contentStream.showText(type);
        contentStream.endText();
    }

}
