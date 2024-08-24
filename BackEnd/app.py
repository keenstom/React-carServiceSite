from flask import Flask,request,jsonify,session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import sqlite3
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from datetime import datetime




app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///kullanicilar.db'
app.config['SECRET_KEY'] = 'gizlikey'
db = SQLAlchemy(app)

migrate = Migrate(app, db)

admin = Admin(app, name='Admin Panel', template_mode='bootstrap3')


class Booking(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(100), nullable=False)
   email = db.Column(db.String(100), nullable=False)
   service = db.Column(db.String(100), nullable=False)
   date = db.Column(db.DateTime, nullable=False)
   special_request = db.Column(db.Text, nullable=True)
   def delete(self):
        db.session.delete(self)
        db.session.commit() 
   
    
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    subject = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    

class Subscriber(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    def delete(self):
        db.session.delete(self)
        db.session.commit()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    passw = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}','{self.passw}')"
    

class Technician(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    job_title = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(100), nullable=False)
    facebook = db.Column(db.String(100))
    twitter = db.Column(db.String(100))
    instagram = db.Column(db.String(100))

class Testimonial(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_name = db.Column(db.String(100))
    profession = db.Column(db.String(100))
    text = db.Column(db.Text)

class ServisTur(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    servis_name = db.Column(db.String(100))
    

@app.route('/book', methods=['POST'])
def book_technician():
    data = request.get_json()
    date_str = data['date']
    date_obj = datetime.strptime(date_str, '%Y-%m-%d') 
    new_booking = Booking(name=data['name'], email=data['email'], service=data['service'], date=date_obj, special_request=data['special_request'])
    db.session.add(new_booking)
    db.session.commit()
    return jsonify({'message': 'Technician added successfully'}), 201

@app.route('/contact', methods=['POST'])
def add_contact():
    data = request.get_json()
    name = data['name']
    email = data['email']
    subject = data['subject']
    message = data['message']
    new_contact = Contact(name=name, email=email, subject=subject, message=message)
    db.session.add(new_contact)
    db.session.commit()
    return jsonify({'message': 'Contact added successfully'}), 201

@app.route('/technicians')
def get_technicians():
    technicians = Technician.query.all()
    return jsonify([{
        'id': technician.id,
        'name': technician.name,
        'job_title': technician.job_title,
        'image': technician.image,
        'facebook': technician.facebook,
        'twitter': technician.twitter,
        'instagram': technician.instagram
    } for technician in technicians])

@app.route('/testimonials')
def get_testimonials():
    testimonials = Testimonial.query.all()

    testimonial_data = []
    for testimonial in testimonials:
        testimonial_info = {
            'id': testimonial.id,
            'client_name': testimonial.client_name,
            'profession': testimonial.profession,
            'text': testimonial.text,
        }
        testimonial_data.append(testimonial_info)

    return jsonify(testimonial_data)

admin.add_view(ModelView(Subscriber, db.session))
admin.add_view(ModelView(Booking, db.session))
admin.add_view(ModelView(Contact, db.session))
admin.add_view(ModelView(Technician, db.session))
admin.add_view(ModelView(Testimonial, db.session))

with app.app_context():
    db.create_all()
    