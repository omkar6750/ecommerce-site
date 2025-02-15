import os
import random
from flask_migrate import Migrate
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request, set_access_cookies
import uuid
from dotenv import load_dotenv
from flask_cors import CORS
from werkzeug.utils import secure_filename
from flask import send_from_directory, current_app
from flask import make_response
from datetime import timedelta 
from datetime import datetime, timezone
from sqlalchemy import func






load_dotenv()


# Initialize Flask app

app = Flask(__name__)

CORS(app, resources={r"/*": {
    "origins": os.environ.get('CORS_URI'),
    "methods": ["GET", "POST", "PUT", "DELETE", "PATCH"],
    "allow_headers": ["Content-Type", "Authorization"],
    "supports_credentials": True  
}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'

app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY') 
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 172800 
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]  
app.config["JWT_ACCESS_COOKIE_NAME"] = "access_token"
app.config["JWT_COOKIE_SECURE"] = True  # Set to True if using HTTPS
app.config["JWT_COOKIE_CSRF_PROTECT"] = False 

app.config["JWT_TOKEN_LOCATION"] = ["cookies"]  # ✅ Use only cookies
app.config["JWT_ACCESS_COOKIE_NAME"] = "access_token"



db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)


# ------------------------- Database Models ------------------------- #
product_tags = db.Table('product_tags',
    db.Column('product_id', db.String(36), db.ForeignKey('product.product_id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True)
)


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
    cart_items = db.relationship('Cart', backref='user', lazy=True)  
    is_admin = db.Column(db.Boolean, default=False) 
    profile_setup = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

class Product(db.Model):
    product_id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    tags = db.Column(db.Text, nullable=True)  
    gender = db.Column(db.String(10), nullable=True)
    old_price = db.Column(db.Float, nullable=True)
    new_price = db.Column(db.Float, nullable=False)
    product_image = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
    tags = db.relationship('Tag', secondary=product_tags, backref=db.backref('products', lazy='dynamic'), lazy='dynamic')
    variants = db.relationship('ProductVariant', backref='product', lazy=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

class ProductVariant(db.Model):
    sku = db.Column(db.String(50), primary_key=True)  # Using SKU as primary key
    product_id = db.Column(db.String(36), db.ForeignKey('product.product_id'), nullable=False)
    size = db.Column(db.String(50), nullable=True)
    colour = db.Column(db.String(50), nullable=True)
    inventory_count = db.Column(db.Integer, nullable=False, default=0)

class Cart(db.Model):
    cart_id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.String(36), db.ForeignKey("product.product_id"), nullable=False)
    variant_sku = db.Column(db.String(50), db.ForeignKey("product_variant.sku",  name="fk_cart_variant_sku"), nullable=True)
    quantity = db.Column(db.Integer, nullable=False)
    variant = db.relationship("ProductVariant", backref=db.backref("cart", lazy=True))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

class Order(db.Model):
    order_id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    order_value = db.Column(db.Float, nullable=False)
    address = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    order_items = db.relationship("OrderItem", back_populates="order")
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)


class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(36), db.ForeignKey("order.order_id"), nullable=False)
    product_id = db.Column(db.String(36), db.ForeignKey("product.product_id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    order = db.relationship("Order", back_populates="order_items")




# ------------------------- API Endpoints ------------------------- #

@app.route('/uploads/<filename>')
def upload_file(filename):
    upload_folder = current_app.config.get('UPLOAD_FOLDER', 'uploads')
    return send_from_directory(upload_folder, filename)

# Authentication Routes
@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        print(data)

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

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"error": "email-listed"}), 400

        hashed_password = generate_password_hash(password)
        new_user = User(email=email, password=hashed_password)

        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(identity=new_user.id)

        response = make_response(jsonify({
            "user": {
                "id": new_user.id,
                "email": new_user.email,
                "profileSetup": False,
            }
        }), 201)

        response.set_cookie(
            "access_token",
            access_token,
            max_age=2 * 24 * 60 * 60,  # 2 days in seconds
            httponly=True, 
            samesite="None",  # Helps with CSRF protection
            secure=False,  # Change to True if using HTTPS

        )
        return response

    except Exception as e:
        print("Signup error:", str(e))
        return jsonify({"error": "Internal Server Error"}), 500



@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        print(data)

        user = User.query.filter_by(email=data["email"]).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        if not check_password_hash(user.password, data["password"]):
            return jsonify({"error": "Invalid password"}), 401

        access_token = create_access_token(identity=user.id, )

        response = make_response(jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "email": user.email
            }
        }), 200)

        response.set_cookie(
            "access_token",
            access_token,
            max_age=2 * 24 * 60 * 60,  # 2 days in seconds
            httponly=True,  # Prevents JavaScript access
            samesite="None",  # Helps with CSRF protection
            secure=True,  # Change to True if using HTTPS

        )
        return response
    
    except Exception as e:
        print("Signup error:", str(e))
        return jsonify({"error": "Internal Server Error"}), 500
    
@app.route("/logout", methods=["POST"])
def logout():
    response = make_response(jsonify({"message": "Logout successful"}))
    response.set_cookie("access_token", "", expires=0)  # Clears the cookie
    return response



@app.route('/profile_creation', methods=['POST'])
def profile_creation():
    verify_jwt_in_request(optional=True)
    user_id = get_jwt_identity()  
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
def create_product():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    # Required fields: name and new_price
    name = data.get('name')
    new_price = data.get('new_price')
    print(data)
    if not name or new_price is None:
        return jsonify({'error': 'Name and new_price are required'}), 400

    try:
        # Create the Product instance with basic fields
        product = Product(
            name=name,
            gender=data.get('gender'),
            old_price=data.get('old_price'),
            new_price=new_price,
            product_image=data.get('product_image'),
            description=data.get('description')
            # created_at and updated_at will be set automatically
        )

        # Handle Tags: Expecting tags to be sent as an array of tag names
        tags_data = data.get('tags', [])
        for tag_name in tags_data:
            # Try to find an existing tag with that name
            tag = Tag.query.filter_by(name=tag_name).first()
            if not tag:
                # If not found, create a new tag
                tag = Tag(name=tag_name)
                db.session.add(tag)
                # Commit later so that tag gets an ID, if needed
            product.tags.append(tag)

        # Handle Variants: Expecting an array of variant objects
        variants_data = data.get('variants', [])
        for variant_data in variants_data:
            variant = ProductVariant(
                sku=variant_data.get('sku'),
                size=variant_data.get('size'),
                colour=variant_data.get('colour'),
                inventory_count=variant_data.get('inventory_count', 0),
                product_id=product.product_id  # automatically link the variant to the product
            )
            product.variants.append(variant)
            db.session.add(variant)

        db.session.add(product)
        db.session.commit()

        return jsonify({
            'message': 'Product created successfully',
            'product_id': product.product_id
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route("/edit_product/<string:product_id>", methods=["PATCH"])
def edit_product(product_id):
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Find the product by product_id
    product = Product.query.filter_by(product_id=product_id).first()
    if not product:
        return jsonify({"error": "Product not found"}), 404

    # Update top-level fields if provided in payload
    product.name = data.get("name", product.name)
    product.gender = data.get("gender", product.gender)
    product.old_price = data.get("old_price", product.old_price)
    product.new_price = data.get("new_price", product.new_price)
    product.product_image = data.get("product_image", product.product_image)
    product.description = data.get("description", product.description)

    # Update Tags: Clear existing tags and add new ones (assuming payload contains an array of tag names)
    if "tags" in data:
        product.tags = []  # Clear current associations (without deleting Tag objects)
        for tag_name in data["tags"]:
            tag = Tag.query.filter_by(name=tag_name).first()
            if not tag:
                tag = Tag(name=tag_name)
                db.session.add(tag)
            product.tags.append(tag)

    # Update Variants: Remove existing variants and add new ones from payload
    if "variants" in data:
        # Delete existing variants associated with this product
        for variant in product.variants:
            db.session.delete(variant)
        product.variants = []  # Clear relationship
        for variant_data in data["variants"]:
            variant = ProductVariant(
                sku=variant_data.get("sku"),
                size=variant_data.get("size"),
                colour=variant_data.get("colour"),
                inventory_count=variant_data.get("inventory_count", 0),
                product_id=product.product_id  # Link variant to this product
            )
            product.variants.append(variant)
            db.session.add(variant)

    try:
        db.session.commit()
        return jsonify({
            "message": "Product updated successfully",
            "product_id": product.product_id
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route('/delete_product/<string:product_id>', methods=['DELETE'])
def delete_product(product_id):
    verify_jwt_in_request(optional=True)

    # user_id = get_jwt_identity()
    # user = User.query.get(user_id)
    # print(user_id)
    # if not user or not user.is_admin:
    #     return jsonify({"error": "Admin access required"}), 403
    
    
    print(product_id)
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    for variant in product.variants:
        db.session.delete(variant)
    
    product.tags = []

    if product.product_image:
        upload_folder = app.config.get("UPLOAD_FOLDER", "uploads")
        file_path = os.path.join(upload_folder, product.product_image)
        if os.path.exists(file_path):
            os.remove(file_path)

    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Product deleted successfully"}), 200


@app.route('/product_image_upload', methods=['POST'])
def product_image_upload():
    
    verify_jwt_in_request(optional=True)
    
    product_id = request.form.get("productId")
    if not product_id:
        return jsonify({"error": "Product ID is required"}), 400
    
    print("Product ID received:", product_id)
    print("Files received:", request.files)


    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    # if not user or not user.is_admin:
    #     return jsonify({"error": "Admin access required"}), 403

    
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    original_filename = secure_filename(file.filename)
    new_filename = f"{product_id}_{original_filename}"

    upload_folder = app.config.get("UPLOAD_FOLDER", "uploads")
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)
    file_path = os.path.join(upload_folder, new_filename)

    if product.product_image:
        old_file_path = os.path.join(upload_folder, product.product_image)
        if os.path.exists(old_file_path):
            os.remove(old_file_path)

    file.save(file_path)

    product.product_image = new_filename
    print(f"updating product image : {new_filename}")
    db.session.commit()


    return jsonify({
        "message": "Image uploaded successfully",
        "product_image": new_filename
    }), 200

# Order & Cart Routes
@app.route("/order_generated/<int:order_id>", methods=["GET"])
def order_generated(order_id):
    verify_jwt_in_request(optional=True)

    user_id = get_jwt_identity()
    order = Order.query.filter_by(id=order_id, user_id=user_id).first()

    if not order:
        return jsonify({"error": "Order not found"}), 404

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

@app.route("/fetch_single_product/<string:product_id>", methods=["GET"])
def fetch_single_product(product_id):
    verify_jwt_in_request(optional=True)
    product = Product.query.filter_by(product_id=product_id).first()

    if not product:
        return jsonify({"error": "Product not found"}), 404

    product_data = {
        "product_id": product.product_id,
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

    return jsonify(product_data), 200

@app.route("/api/products" ,methods=["POST"])
def data_table_products():
     # Get pagination parameters from query parameters; default page=1, per_page=10
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)

    # Optionally verify JWT (adjust as needed)
    verify_jwt_in_request(optional=True)

    # Get filter data from the request JSON body
    data = request.get_json() or {}
    filters = data.get("filters", {})

    # Start with the base query
    query = Product.query

    # Dynamically apply filters for each provided key
    for key, value in filters.items():
        if hasattr(Product, key) and key not in ["sort", "randomPage"]:
            query = query.filter(getattr(Product, key) == value)

    sort_order = filters.get("sort")
    if sort_order == "newest":
        query = query.order_by(Product.created_at.desc())
    elif sort_order == "random":
        query = query.order_by(func.random())

    if filters.get("randomPage", False):
        total_items = query.count()
        total_pages = (total_items + per_page - 1) // per_page
        page = random.randint(1, total_pages)

    # Paginate the query
    paginated_products = query.paginate(page=page, per_page=per_page, error_out=False)

    # Format each product to include its variants and tags (converted to strings)
    products = [{
        "product_id": product.product_id,
        "name": product.name,
        "gender": product.gender,
        "old_price": product.old_price,
        "new_price": product.new_price,
        "product_image": product.product_image,
        "description": product.description,
        "tags": [tag.name for tag in product.tags],  # Convert Tag objects to strings
        "variants": [{
            "sku": variant.sku,
            "size": variant.size,
            "colour": variant.colour,
            "inventory_count": variant.inventory_count
        } for variant in product.variants]
    } for product in paginated_products.items]

    # Return data in a standard format with meta information
    return jsonify({
        "data": products,
        "meta": {
            "totalPages": paginated_products.pages,
            "currentPage": page,
            "perPage": per_page,
            "totalItems": paginated_products.total
        }
    }), 200



# ------------------------- Run Flask App ------------------------- #
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  
        app.run(debug=True)
