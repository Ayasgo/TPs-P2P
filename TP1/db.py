from functools import wraps
from flask import abort

BLACKLIST = ["VOLDEMORT", "SAURON"] # Liste noire

def check_blacklist(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # On vérifie si le nom envoyé (en POST ou GET) est dans la liste
        nom = request.form.get('nom') or request.args.get('nom')
        if nom and nom.upper() in BLACKLIST:
            return "<h1>Accès Interdit : Vous êtes sur la liste noire !</h1>", 403
        return f(*args, **kwargs)
    return decorated_function

# Application du filtre sur la route loterie
@app.route('/loterie', methods=['GET', 'POST'])
@check_blacklist  # <-- On ajoute le filtre ici
def loterie():
    # ... code existant ...