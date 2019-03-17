import psycopg2
import json
i=0

confs=json.load(open("config.json"))
entry=confs["data"]
for d in entry:
  database=d["database"]
  user=d["user"]
  password=d["password"]
  host=d["host"]
  port=d["port"]

conn = psycopg2.connect(database=database, user=user, password=password, host=host, port=port)
cur = conn.cursor()
#Database table extraction and copy the content.
cur.execute("SELECT subscription_id FROM subscriptions")
rows = cur.fetchall()
for i in rows:
 row = str(rows)
 row=row.replace("(","").replace(")","").replace(",,",",").replace("]","").replace("[","").replace("'","").replace("'","")

print row