import sqlite3

def init_db():
    conn = sqlite3.connect('loterie.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS gains (nom TEXT, montant REAL)''')
    conn.commit()
    conn.close()

