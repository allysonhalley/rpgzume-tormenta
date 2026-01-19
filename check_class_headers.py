
import pdfplumber

pdf_path = "G:\\Meu Drive\\RPG\\Tormenta\\TormentaRPG Modulo Báasico Edicao Guilda do Macaco Caolho.pdf"
pages_to_check = range(47, 77)

with pdfplumber.open(pdf_path) as pdf:
   for p_num in pages_to_check:
       if p_num <= len(pdf.pages):
           page = pdf.pages[p_num-1]
           text = page.extract_text()
           if text:
               # Print valid lines that might be headers (short lines, upper case or distinct)
               lines = text.split('\n')
               for line in lines[:3]:
                   if len(line.strip()) < 30 and len(line.strip()) > 3:
                       print(f"Page {p_num}: {line.strip()}")
