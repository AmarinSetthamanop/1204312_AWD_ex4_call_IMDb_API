import pandas as pd

file = r'src\service\movie data IDs\data.tsv'

df = pd.read_csv(file, sep='\t')  # ใช้ sep='\t' เพื่อระบุว่าข้อมูลแต่ละคอลัมน์คั่นด้วย tab

# เรียงลำดับตามคอลัมน์ 'numVotes' จากมากไปน้อย
df_sorted = df.sort_values(by='numVotes', ascending=False)

# เลือกแถว 100 แถวแรก
top_100 = df_sorted.head(100)

# บันทึกเป็นไฟล์ JSON
top_100.to_json('top_100_movies.json', orient='records')

# แสดงผลลัพธ์
print(top_100)