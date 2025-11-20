from flask import Flask, request, render_template
from db import init_db
import sqlite3
import random

from functools import wraps
from flask import abort

BLACKLIST = ["VOLDEMORT", "SAURON"] # Liste noire

def check_role(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # On vérifie si le nom envoyé (en POST ou GET) est dans la liste
        role = request.form.get('role') or request.args.get('role')
        if role and role.upper()!="tomcat":
            return "<h1>Accès Interdit : Vous êtes sur la liste noire !</h1>", 403
        return f(*args, **kwargs)
    return decorated_function

def check_blacklist(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # On vérifie si le nom envoyé (en POST ou GET) est dans la liste
        nom = request.form.get('nom') or request.args.get('nom')
        if nom and nom.upper() in BLACKLIST:
            return "<h1>Accès Interdit : Vous êtes sur la liste noire !</h1>", 403
        return f(*args, **kwargs)
    return decorated_function


app = Flask(__name__)

init_db() # On crée la table au lancement

# Route pour la page d'accueil (affiche le formulaire)
# Équivalent au fichier HTML statique servi par Tomcat
@app.route('/')
def home():
    return render_template('index.html')

# Route qui traite le formulaire (Équivalent à GreetingServlet)
@app.route('/loterie', methods=['GET', 'POST'])
@check_blacklist  # <-- On ajoute le filtre ici
@check_role  # <-- On ajoute le filtre ici
def loterie():
    nom_prenom = "Anonymous"
    
    # Équivalent de request.getParameter("nom")
    if request.method == 'POST':
        nom_recu = request.form.get('nom')
    else:
        nom_recu = request.args.get('nom') # Pour gérer le GET aussi
        
    if nom_recu:
        nom_prenom = nom_recu.upper()

    # Logique métier (calcul du gain)
    gain = round(random.random() * 10, 2)
    conn = sqlite3.connect('loterie.db')
    c = conn.cursor()
    c.execute("INSERT INTO gains (nom, montant) VALUES (?, ?)", (nom_prenom, gain))
    conn.commit()
    conn.close()

    # Construction de la réponse (Équivalent de out.println)
    # Note: En Python moderne, on utilise des f-strings pour insérer les variables
    html_response = f"""
    <html>
    <body>
        <h1>Greetings {nom_prenom}!</h1>
        <p>Vous avez gagné: <b>{gain}</b> millions de dollars!</p>
        <a href="/">Rejouer</a>
    </body>
    </html>
    """
    return html_response

if __name__ == '__main__':
    # Lancement du serveur (Équivalent du démarrage de Tomcat)
    app.run(debug=True, port=8080)