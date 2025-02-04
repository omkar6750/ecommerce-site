import os
from flask_migrate import Migrate
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import uuid
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()


# Initialize Flask app

app = Flask(__name__)

CORS(app, resources={r"/*": {
    "origins": "http://localhost:5173",
    "methods": ["GET", "POST", "PUT", "DELETE"],
    "allow_headers": ["Content-Type", "Authorization"]
}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'  
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)


# ------------------------- Database Models ------------------------- #

class User(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    first_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    mobile_number = db.Column(db.String(15), unique=True, nullable=True)
    password = db.Column(db.String(255), nullable=False)
    age = db.Column(db.Integer, nullable=True)
    gender = db.Column(db.String(10), nullable=True)
    address = db.Column(db.Text, nullable=True)
    orders = db.relationship('Order', backref='user', lazy=True)
    is_admin = db.Column(db.Boolean, default=False) 
    profile_setup = db.Column(db.Boolean, default=False) 

class Product(db.Model):
    product_id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    size = db.Column(db.String(50), nullable=True)
    tags = db.Column(db.Text, nullable=True)  
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

class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(36), db.ForeignKey("order.order_id"), nullable=False)
    product_id = db.Column(db.String(36), db.ForeignKey("product.product_id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    order = db.relationship("Order", backref=db.backref("order_items", lazy=True))

# ------------------------- API Endpoints ------------------------- #

# Authentication Routes
@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "email-password-required"}), 400
        
        if "@" not in email or "." not in email:
            return jsonify({"error": "email-invalid"}), 400

        if not any(c.isalpha() for c in password):
            return jsonify({"error": "password-missing-letter"}), 400
        
        if not any(c.isdigit() for c in password):
            return jsonify({"error": "password-missing-digit"}), 400
        
        if len(password) < 6:
            return jsonify({"error": "password-too-short"}), 400
        
        if not any(c in "@$!%*?&" for c in password):
            return jsonify({"error": "password-missing-special-character"}), 400
        
        if not all(c.isalnum() or c in "@$!%*?&" for c in password):
            return jsonify({"error": "password-invalid-characters"}), 400

        # Check if email is already in use
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"error": "email-listed"}), 400

        # Create new user
        hashed_password = generate_password_hash(password)
        new_user = User(email=email, password=hashed_password)

        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(identity=new_user.id)

        return jsonify({
            "user": {
                "id": new_user.id,
                "email": new_user.email,
                "profileSetup": False,
            },
            "access_token": access_token
        }), 201

    except Exception as e:
        print("Signup error:", str(e))
        return jsonify({"error": "Internal Server Error"}), 500



@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        print(data)

        # Check if user exists
        user = User.query.filter_by(email=data["email"]).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Verify password
        if not check_password_hash(user.password, data["password"]):
            return jsonify({"error": "Invalid password"}), 401

        # Generate JWT Token
        access_token = create_access_token(identity=user.id)

        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "email": user.email
            },
            "access_token": access_token
        }), 200
    except Exception as e:
        print("Signup error:", str(e))
        return jsonify({"error": "Internal Server Error"}), 500


@app.route('/profile_creation', methods=['POST'])
def profile_creation():
    user_id = get_jwt_identity()  # Get user ID from JWT token
    data = request.get_json()

    # Find the user in the database
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Update user details
    user.first_name = data.get("first_name", user.first_name)
    user.last_name = data.get("last_name", user.last_name)
    user.mobile_number = data.get("mobile_number", user.mobile_number)
    user.age = data.get("age", user.age)
    user.gender = data.get("gender", user.gender)
    user.address = data.get("address", user.address)

    db.session.commit()  # Save changes

    return jsonify({
        "message": "Profile updated successfully",
        "user": {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "mobile_number": user.mobile_number,
            "age": user.age,
            "gender": user.gender,
            "address": user.address
        }
    }), 200

# Product Management (Admin Only)
@app.route('/create_product', methods=['POST'])
@jwt_required()  # Require authentication
def create_product():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    # Check if user exists and is an admin
    if not user or not user.is_admin:
        return jsonify({"error": "Admin access required"}), 403

    data = request.get_json()

    # Create new product
    new_product = Product(
        name=data["name"],
        size=data["size"],
        tags=data["tags"],  # Store as comma-separated string
        gender=data["gender"],
        colour=data["colour"],
        old_price=data["old_price"],
        new_price=data["new_price"],
        product_image=data["product_image"],
        description=data["description"]
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify({
        "message": "Product created successfully",
        "product": {
            "id": new_product.id,
            "name": new_product.name,
            "size": new_product.size,
            "tags": new_product.tags,
            "gender": new_product.gender,
            "colour": new_product.colour,
            "old_price": new_product.old_price,
            "new_price": new_product.new_price,
            "product_image": new_product.product_image,
            "description": new_product.description
        }
    }), 201

@app.route('/edit_product/<string:product_id>', methods=['PUT'])
@jwt_required()
def edit_product(product_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    # Check admin access
    if not user or not user.is_admin:
        return jsonify({"error": "Admin access required"}), 403

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    data = request.get_json()

    # Update product fields
    product.name = data.get("name", product.name)
    product.size = data.get("size", product.size)
    product.tags = data.get("tags", product.tags)
    product.gender = data.get("gender", product.gender)
    product.colour = data.get("colour", product.colour)
    product.old_price = data.get("old_price", product.old_price)
    product.new_price = data.get("new_price", product.new_price)
    product.product_image = data.get("product_image", product.product_image)
    product.description = data.get("description", product.description)

    db.session.commit()

    return jsonify({
        "message": "Product updated successfully",
        "product": {
            "id": product.id,
            "name": product.name,
            "size": product.size,
            "tags": product.tags,
            "gender": product.gender,
            "colour": product.colour,
            "old_price": product.old_price,
            "new_price": product.new_price,
            "product_image": product.product_image,
            "description": product.description
        }
    }), 200

@app.route('/delete_product/<string:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    # Check admin access
    if not user or not user.is_admin:
        return jsonify({"error": "Admin access required"}), 403

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Product deleted successfully"}), 200

# Order & Cart Routes
@app.route("/order_generated/<int:order_id>", methods=["GET"])
@jwt_required()
def order_generated(order_id):
    user_id = get_jwt_identity()
    order = Order.query.filter_by(id=order_id, user_id=user_id).first()

    if not order:
        return jsonify({"error": "Order not found"}), 404

    # Fetch order details
    order_items = OrderItem.query.filter_by(order_id=order.id).all()
    product_list = []

    for item in order_items:
        product = Product.query.get(item.product_id)
        product_list.append({
            "product_id": product.id,
            "name": product.name,
            "quantity": item.quantity,
            "price": product.new_price
        })

    order_data = {
        "order_id": order.id,
        "order_value": order.order_value,
        "address": order.address,
        "status": order.status,
        "products": product_list
    }

    return jsonify({"message": "Order confirmed", "order_details": order_data}), 200


# Product Fetching
@app.route("/fetch_products", methods=["GET"])
def fetch_products():
    page = request.args.get("page", 1, type=int)  # Default page 1
    per_page = 10  # Number of products per request

    paginated_products = Product.query.paginate(page=page, per_page=per_page, error_out=False)

    products = []
    for product in paginated_products.items:
        products.append({
            "product_id": product.id,
            "name": product.name,
            "size": product.size,
            "tags": product.tags,
            "gender": product.gender,
            "colour": product.colour,
            "old_price": product.old_price,
            "new_price": product.new_price,
            "product_image": product.product_image,
            "description": product.description
        })

    return jsonify({"products": products, "total_pages": paginated_products.pages}), 200

# ------------------------- Run Flask App ------------------------- #
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables if they don’t exist
    app.run(debug=True)
