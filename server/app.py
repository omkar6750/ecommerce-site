from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import uuid

# Initialize Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'  # Using SQLite for simplicity
app.config['JWT_SECRET_KEY'] = 'your_secret_key'  # Change this to a strong secret

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# ------------------------- Database Models ------------------------- #

class User(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    mobile_number = db.Column(db.String(15), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    age = db.Column(db.Integer, nullable=True)
    gender = db.Column(db.String(10), nullable=True)
    address = db.Column(db.Text, nullable=True)
    orders = db.relationship('Order', backref='user', lazy=True)

class Product(db.Model):
    product_id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    size = db.Column(db.String(50), nullable=True)
    tags = db.Column(db.Text, nullable=True)  # Stored as a comma-separated string
    gender = db.Column(db.String(10), nullable=True)
    colour = db.Column(db.String(50), nullable=True)
    old_price = db.Column(db.Float, nullable=True)
    new_price = db.Column(db.Float, nullable=False)
    product_image = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)

class Order(db.Model):
    order_id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    order_value = db.Column(db.Float, nullable=False)
    address = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)

# ------------------------- API Endpoints ------------------------- #

# Authentication Routes
@app.route('/signup', methods=['POST'])
def signup():
    # TODO: Implement user registration logic
    pass

@app.route('/login', methods=['POST'])
def login():
    # TODO: Implement login logic
    pass

@app.route('/profile_creation', methods=['POST'])
@jwt_required()
def profile_creation():
    # TODO: Implement profile update logic
    pass

# Product Management (Admin Only)
@app.route('/create_product', methods=['POST'])
@jwt_required()
def create_product():
    # TODO: Implement product creation logic
    pass

@app.route('/edit_product/<string:product_id>', methods=['PUT'])
@jwt_required()
def edit_product(product_id):
    # TODO: Implement product edit logic
    pass

@app.route('/delete_product/<string:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    # TODO: Implement product deletion logic
    pass

# Order & Cart Routes
@app.route('/order_generated', methods=['POST'])
@jwt_required()
def order_generated():
    # TODO: Implement order processing logic
    pass

# Product Fetching
@app.route('/products', methods=['GET'])
def get_products():
    # TODO: Implement logic to fetch products in paginated form
    pass

# ------------------------- Run Flask App ------------------------- #
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables if they don’t exist
    app.run(debug=True)
