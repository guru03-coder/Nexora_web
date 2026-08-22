import json
import os
from datetime import datetime
import openpyxl
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
from openpyxl.utils import get_column_letter

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

def generate_excel_report(db_path, output_excel_path):
    with open(db_path, "r") as f:
        db = json.load(f)

    teams = db.get("teams", [])
    cyber_teams = sorted(teams, key=lambda x: x["id"])

    wb = openpyxl.Workbook()
    
    thin_border = Border(
        left=Side(style='thin', color='CBD5E1'),
        right=Side(style='thin', color='CBD5E1'),
        top=Side(style='thin', color='CBD5E1'),
        bottom=Side(style='thin', color='CBD5E1')
    )
    
    header_border = Border(
        left=Side(style='medium', color='475569'),
        right=Side(style='medium', color='475569'),
        top=Side(style='medium', color='475569'),
        bottom=Side(style='medium', color='475569')
    )

    # 1. Cyber Security Master Roster Sheet
    ws = wb.active
    ws.title = "Cyber Security Track"
    ws.views.sheetView[0].showGridLines = True

    # Title Block
    ws.merge_cells('A1:I1')
    title_cell = ws['A1']
    title_cell.value = f"NEXORA 2026 — CYBER SECURITY TRACK MASTER ROSTER ({len(cyber_teams)} TEAMS)"
    title_cell.font = Font(name="Calibri", size=14, bold=True, color="FFFFFF")
    title_cell.fill = PatternFill(start_color="581C87", end_color="581C87", fill_type="solid")
    title_cell.alignment = Alignment(horizontal="center", vertical="center")
    ws.row_dimensions[1].height = 30

    # Subtitle Block
    ws.merge_cells('A2:I2')
    sub_cell = ws['A2']
    now_str = datetime.now().strftime("%B %d, %Y • %I:%M %p")
    sub_cell.value = f"Official Event Team Roster • Generated on {now_str} • Total Registered Teams: {len(cyber_teams)}"
    sub_cell.font = Font(name="Calibri", size=10, italic=True, color="475569")
    sub_cell.fill = PatternFill(start_color="F1F5F9", end_color="F1F5F9", fill_type="solid")
    sub_cell.alignment = Alignment(horizontal="center", vertical="center")
    ws.row_dimensions[2].height = 20

    ws.row_dimensions[3].height = 10

    # Table Headers
    headers = [
        "S.No", "Team ID", "Team Name", "Team Leader Name", 
        "Contact Phone", "Team Size", "Assigned Venue / Floor", 
        "Track", "Submission Status"
    ]
    
    for col_num, header_title in enumerate(headers, 1):
        cell = ws.cell(row=4, column=col_num)
        cell.value = header_title
        cell.font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
        cell.fill = PatternFill(start_color="581C87", end_color="581C87", fill_type="solid")
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        cell.border = header_border

    ws.row_dimensions[4].height = 26

    # Populate Rows
    for row_idx, t in enumerate(cyber_teams, start=5):
        venue = get_floor_name(t["id"])
        status = t.get("status", "In Progress")
        
        row_values = [
            row_idx - 4,
            t["id"],
            t["name"],
            t.get("leaderName", "N/A"),
            t.get("leaderPhone", "N/A"),
            t.get("membersCount", 4),
            venue,
            "Cyber Security",
            status
        ]

        fill_color = "F3E8FF" if (row_idx % 2 == 0) else "FFFFFF"

        for col_num, val in enumerate(row_values, 1):
            cell = ws.cell(row=row_idx, column=col_num)
            cell.value = val
            cell.border = thin_border
            cell.fill = PatternFill(start_color=fill_color, end_color=fill_color, fill_type="solid")

            if col_num in [1, 2, 5, 6, 8, 9]:
                cell.alignment = Alignment(horizontal="center", vertical="center")
            else:
                cell.alignment = Alignment(horizontal="left", vertical="center")

            if col_num == 2:
                cell.font = Font(name="Calibri", size=10, bold=True, color="6B21A8")
            elif col_num == 3:
                cell.font = Font(name="Calibri", size=10, bold=True, color="0F172A")
            else:
                cell.font = Font(name="Calibri", size=10, color="1E293B")

        ws.row_dimensions[row_idx].height = 20

    # Auto-fit column widths
    for col in ws.columns:
        max_len = 0
        col_letter = get_column_letter(col[0].column)
        for cell in col:
            if cell.row in [1, 2]: continue
            val_str = str(cell.value or "")
            if len(val_str) > max_len:
                max_len = len(val_str)
        ws.column_dimensions[col_letter].width = max(max_len + 4, 12)

    # 2. Venue Summary Sheet
    ws_summary = wb.create_sheet(title="Venue Breakdown Summary")
    ws_summary.views.sheetView[0].showGridLines = True
    
    ws_summary.merge_cells('A1:E1')
    t_cell = ws_summary['A1']
    t_cell.value = "NEXORA 2026 — CYBER SECURITY VENUE DISTRIBUTION"
    t_cell.font = Font(name="Calibri", size=14, bold=True, color="FFFFFF")
    t_cell.fill = PatternFill(start_color="0F172A", end_color="0F172A", fill_type="solid")
    t_cell.alignment = Alignment(horizontal="center", vertical="center")
    ws_summary.row_dimensions[1].height = 30

    sum_headers = ["Venue / Location", "ID Range", "Track Name", "Total Teams", "Percentage"]
    for col_idx, h in enumerate(sum_headers, 1):
        c = ws_summary.cell(row=3, column=col_idx)
        c.value = h
        c.font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
        c.fill = PatternFill(start_color="334155", end_color="334155", fill_type="solid")
        c.alignment = Alignment(horizontal="center", vertical="center")
        c.border = header_border
    ws_summary.row_dimensions[3].height = 24

    floors = {}
    for t in teams:
        fl = get_floor_name(t["id"])
        floors[fl] = floors.get(fl, 0) + 1

    prefix_map = {
        "Ground Floor": "NEX0001 - NEX0046",
        "First Floor": "NEX1001 - NEX1047",
        "Second Floor": "NEX2001 - NEX2058",
        "Online / Virtual": "NEX3001 - NEX3023",
    }

    r_idx = 4
    for fl_name, count in floors.items():
        row_vals = [
            fl_name,
            prefix_map.get(fl_name, "N/A"),
            "Cyber Security",
            count,
            f"{(count/len(teams))*100:.1f}%"
        ]
        for col_idx, val in enumerate(row_vals, 1):
            c = ws_summary.cell(row=r_idx, column=col_idx)
            c.value = val
            c.border = thin_border
            c.font = Font(name="Calibri", size=10, color="1E293B")
            if col_idx in [3, 4, 5]:
                c.alignment = Alignment(horizontal="center", vertical="center")
            else:
                c.alignment = Alignment(horizontal="left", vertical="center")
        ws_summary.row_dimensions[r_idx].height = 20
        r_idx += 1

    # Total Row
    total_vals = ["GRAND TOTAL", "ALL VENUES", "Cyber Security", len(teams), "100.0%"]
    for col_idx, val in enumerate(total_vals, 1):
        c = ws_summary.cell(row=r_idx, column=col_idx)
        c.value = val
        c.font = Font(name="Calibri", size=10, bold=True, color="0F172A")
        c.fill = PatternFill(start_color="E2E8F0", end_color="E2E8F0", fill_type="solid")
        c.border = thin_border
        if col_idx in [3, 4, 5]:
            c.alignment = Alignment(horizontal="center", vertical="center")
        else:
            c.alignment = Alignment(horizontal="left", vertical="center")
    ws_summary.row_dimensions[r_idx].height = 22

    for col in ws_summary.columns:
        max_len = max(len(str(cell.value or "")) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws_summary.column_dimensions[col_letter].width = max(max_len + 5, 14)

    wb.save(output_excel_path)
    print(f"Excel report successfully generated at: {output_excel_path}")

if __name__ == "__main__":
    db_file = "./data/final_db.json"
    out_excel = "./public/uploads/Nexora_Admin_Track_Report.xlsx"
    os.makedirs(os.path.dirname(out_excel), exist_ok=True)
    generate_excel_report(db_file, out_excel)

    root_excel = "./Nexora_Admin_Track_Report.xlsx"
    generate_excel_report(db_file, root_excel)
