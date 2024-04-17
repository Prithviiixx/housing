import sqlite3
import base64
from flask import Flask, request
from flask_cors import CORS
from routes.scalable import queue_bp
import json

app = Flask(__name__)
app.register_blueprint(queue_bp)

CORS(app=app)

DB_NAME = 'housing.db'

def database_config():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS property
                (id INTEGER PRIMARY KEY AUTOINCREMENT, property_name TEXT, property_type TEXT, pincode TEXT, city TEXT, category TEXT, description TEXT, price REAL, image TEXT)''')
    conn.commit()

    
@app.route('/', methods=['GET','POST'])
def hello_world():
    if request.method == 'GET':
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM property")
        rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
        result_list = []
        for row in rows:
            result_dict = {}
            for i, value in enumerate(row):
                result_dict[columns[i]] = value
            result_list.append(result_dict)
        cursor.close()
        conn.close()
        return result_list
    
    if request.method == 'POST':
        property_name = request.form.get('property_name')
        property_type = request.form.get('property_type')
        city = request.form.get('city')
        pincode = request.form.get('pincode')
        category = request.form.get('category')        
        description = request.form.get('description')
        price = request.form.get('price')
        
        
        images = [] 

        for file_key in request.files:
            file = request.files[file_key]
            file_contents = file.read()
            file_base64 = base64.b64encode(file_contents).decode('utf-8')
            images.append(file_base64)
        images_json = json.dumps(images)            

        conn = sqlite3.connect(DB_NAME)
        c = conn.cursor()
        c.execute("INSERT INTO property (property_name, property_type, pincode, city, category, description, price, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                (property_name, property_type, pincode, city, category, description, price, images_json))
        conn.commit()
        conn.close()

        return 'Data saved successfully'


@app.route('/product/<int:id>')
def get_product_by_id(id):
    if request.method == 'GET':
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM property where id=?", (id,))
        rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
        result_list = []
        for row in rows:
            result_dict = {}
            for i, value in enumerate(row):
                result_dict[columns[i]] = value
            result_list.append(result_dict)
        cursor.close()
        conn.close()
        with open('samp.json', 'w') as f:
            f.write(str(result_list[0]))
        return result_list[0]
    
    
if __name__ == '__main__':
    database_config()
    app.run(debug=True, port=8000)
