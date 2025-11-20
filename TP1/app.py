from flask import Flask, request, render_template, render_template_string
import random

app = Flask(__name__)

# Route pour la page d'accueil (affiche le formulaire)
# Équivalent au fichier HTML statique servi par Tomcat
@app.route('/')
def home():
    return render_template('index.html')

# Route qui traite le formulaire (Équivalent à GreetingServlet)
@app.route('/loterie', methods=['GET', 'POST'])
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