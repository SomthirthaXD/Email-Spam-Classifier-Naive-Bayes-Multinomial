from flask import *
from flask_cors import CORS
import json
import pickle

model=pickle.load(open("./Email_Model.pkl", "rb"))
cv=pickle.load(open("./Vectorizer.pkl", "rb"))

browserInitializer = Flask(__name__)
CORS(browserInitializer)

@browserInitializer.route("/")
def start():
    return render_template("index.html")

@browserInitializer.route("/spamcheck",methods=['POST','GET'])
def spamcheck():
    print(request.get_data().decode())
    dict=json.loads(request.get_data().decode())
    test_val=cv.transform([dict.get("message")])
    pred=model.predict(test_val)
    result="Spam!" if pred==1 else "Not Spam!"
    
    return {'ServerMessage':result}


if __name__ == "__main__":
    browserInitializer.run(debug=True,port=5000)