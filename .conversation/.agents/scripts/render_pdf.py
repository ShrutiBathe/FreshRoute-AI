from pathlib import Path
import fitz

pdf_path = Path("attached_assets/FreshRoute_AI_Project_Draft_1789836464521.pdf")
output_dir = Path(".agents/outputs/freshroute_pages")
output_dir.mkdir(parents=True, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"pages={doc.page_count}")
print(f"metadata={doc.metadata}")

for index, page in enumerate(doc):
    pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    output_path = output_dir / f"page_{index + 1}.png"
    pixmap.save(output_path)
    text = page.get_text("text").strip()
    print(f"page={index + 1} size={page.rect.width:.0f}x{page.rect.height:.0f} text_chars={len(text)} image={output_path}")
    print(text[:1200].replace("\n", " | "))