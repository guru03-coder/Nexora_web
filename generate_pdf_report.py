import json
import os
from datetime import datetime
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_header_footer(num_pages)
            super().showPage()
        super().save()

    def draw_header_footer(self, page_count):
        self.saveState()
        # Top Header
        self.setStrokeColor(colors.HexColor("#334155"))
        self.setLineWidth(0.75)
        self.line(36, A4[1] - 36, A4[0] - 36, A4[1] - 36)
        
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#6b21a8"))
        self.drawString(36, A4[1] - 28, "NEXORA 2026 HACKATHON")
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        self.drawRightString(A4[0] - 36, A4[1] - 28, "CYBER SECURITY TRACK ADMIN REPORT")

        # Bottom Footer
        self.line(36, 45, A4[0] - 36, 45)
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        self.drawString(36, 32, "Confidential • Nexora Organizing Committee")
        self.drawRightString(A4[0] - 36, 32, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()

def get_floor_name(team_id):
    if team_id.startswith("NEX0"):
        return "Ground Floor"
    elif team_id.startswith("NEX1"):
        return "First Floor"
    elif team_id.startswith("NEX2"):
        return "Second Floor"
    elif team_id.startswith("NEX3"):
        return "Online / Virtual"
    return "Main Venue"

def build_pdf(db_path, output_pdf_path):
    with open(db_path, "r") as f:
        db = json.load(f)

    teams = sorted(db.get("teams", []), key=lambda x: x["id"])

    # Floor statistics
    floors = {}
    for t in teams:
        fl = get_floor_name(t["id"])
        floors[fl] = floors.get(fl, 0) + 1

    doc = SimpleDocTemplate(
        output_pdf_path,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=48,
        bottomMargin=56,
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "DocTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=18,
        leading=22,
        textColor=colors.HexColor("#0f172a"),
    )

    subtitle_style = ParagraphStyle(
        "DocSubTitle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=10,
        leading=14,
        textColor=colors.HexColor("#475569"),
    )

    h2_style = ParagraphStyle(
        "Heading2Custom",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#0f172a"),
        spaceBefore=14,
        spaceAfter=6,
    )

    cell_style = ParagraphStyle(
        "CellText",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8,
        leading=10,
        textColor=colors.HexColor("#1e293b"),
    )

    cell_bold = ParagraphStyle(
        "CellBold",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8,
        leading=10,
        textColor=colors.HexColor("#0f172a"),
    )

    cell_cyber = ParagraphStyle(
        "CellCyber",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8,
        leading=10,
        textColor=colors.HexColor("#6b21a8"),
    )

    cell_header = ParagraphStyle(
        "CellHeader",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8,
        leading=11,
        textColor=colors.white,
    )

    story = []

    # Title Banner Block
    story.append(Paragraph("NEXORA 2026 — Cyber Security Track Admin Report", title_style))
    story.append(Spacer(1, 4))
    now_str = datetime.now().strftime("%B %d, %Y • %I:%M %p")
    story.append(Paragraph(f"Official Event Summary Report • Generated on {now_str} • Total Teams: <b>{len(teams)}</b>", subtitle_style))
    story.append(Spacer(1, 10))

    # Metric Cards Table
    metric_data = [
        [
            Paragraph("<b>TOTAL TEAMS</b><br/><font size=16 color='#0f172a'><b>{}</b></font>".format(len(teams)), cell_style),
            Paragraph("<b>EVENT TRACK</b><br/><font size=14 color='#6b21a8'><b>Cyber Security</b></font>", cell_style),
            Paragraph("<b>PROBLEM STATEMENT</b><br/><font size=10 color='#0284c7'><b>Official Cyber PS</b></font>", cell_style),
            Paragraph("<b>TOTAL PARTICIPANTS</b><br/><font size=16 color='#047857'><b>~{}</b></font>".format(len(teams) * 4), cell_style),
        ]
    ]

    t_metrics = Table(metric_data, colWidths=[128, 134, 134, 126])
    t_metrics.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_metrics)
    story.append(Spacer(1, 14))

    # Venue & Floor-wise Distribution Summary
    story.append(Paragraph("1. Venue & Floor-wise Cyber Security Distribution", h2_style))
    
    floor_table_data = [
        [
            Paragraph("Venue / Location", cell_header),
            Paragraph("Team ID Prefix Range", cell_header),
            Paragraph("Track", cell_header),
            Paragraph("Total Teams", cell_header),
            Paragraph("Percentage Share", cell_header),
        ]
    ]

    prefix_map = {
        "Ground Floor": "NEX0001 - NEX0046",
        "First Floor": "NEX1001 - NEX1047",
        "Second Floor": "NEX2001 - NEX2058",
        "Online / Virtual": "NEX3001 - NEX3023",
    }

    for fl_name, count in floors.items():
        floor_table_data.append([
            Paragraph(fl_name, cell_bold),
            Paragraph(prefix_map.get(fl_name, "Various"), cell_style),
            Paragraph("Cyber Security", cell_cyber),
            Paragraph(f"<b>{count}</b>", cell_bold),
            Paragraph(f"{(count/len(teams))*100:.1f}%", cell_style),
        ])

    floor_table_data.append([
        Paragraph("<b>GRAND TOTAL</b>", cell_bold),
        Paragraph("<b>ALL VENUES</b>", cell_bold),
        Paragraph("<b>Cyber Security</b>", cell_cyber),
        Paragraph(f"<b>{len(teams)}</b>", cell_bold),
        Paragraph("<b>100.0%</b>", cell_bold),
    ])

    t_floors = Table(floor_table_data, colWidths=[130, 130, 100, 82, 80])
    t_floors.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#1e293b")),
        ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor("#f1f5f9")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_floors)
    story.append(Spacer(1, 16))

    # Master Team Roster Section
    story.append(PageBreak())
    story.append(Paragraph(f"2. Cyber Security Track Master Roster ({len(teams)} Teams)", h2_style))
    
    table_data = [
        [
            Paragraph("S.No", cell_header),
            Paragraph("Team ID", cell_header),
            Paragraph("Team Name", cell_header),
            Paragraph("Team Leader Name", cell_header),
            Paragraph("Contact Phone", cell_header),
            Paragraph("Assigned Venue", cell_header),
        ]
    ]

    for idx, t in enumerate(teams, start=1):
        fl = get_floor_name(t["id"])
        table_data.append([
            Paragraph(str(idx), cell_style),
            Paragraph(f"<b>{t['id']}</b>", cell_cyber),
            Paragraph(t['name'], cell_bold),
            Paragraph(t.get('leaderName', 'N/A'), cell_style),
            Paragraph(t.get('leaderPhone', 'N/A'), cell_style),
            Paragraph(fl, cell_style),
        ])

    t_section = Table(table_data, colWidths=[32, 64, 140, 126, 85, 75])
    t_section.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#581c87")),
        ('GRID', (0,0), (-1,-1), 0.4, colors.HexColor("#e2e8f0")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#f8fafc")]),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_section)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF Successfully generated at: {output_pdf_path}")

if __name__ == "__main__":
    db_file = "./data/final_db.json"
    out_pdf = "./public/uploads/Nexora_Admin_Track_Report.pdf"
    os.makedirs(os.path.dirname(out_pdf), exist_ok=True)
    build_pdf(db_file, out_pdf)

    root_pdf = "./Nexora_Admin_Track_Report.pdf"
    build_pdf(db_file, root_pdf)
