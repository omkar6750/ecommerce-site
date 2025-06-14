import os
import random
from flask_migrate import Migrate
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request
import uuid
from dotenv import load_dotenv
from flask_cors import CORS
from werkzeug.utils import secure_filename
from flask import send_from_directory, current_app
from flask import make_response
from datetime import timedelta 
from datetime import datetime, timezone
from sqlalchemy import func
import logging







load_dotenv()



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
app.config["JWT_COOKIE_SECURE"] = True 
app.config["JWT_COOKIE_CSRF_PROTECT"] = False 

app.config["JWT_TOKEN_LOCATION"] = ["cookies"]  
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
    sku = db.Column(db.String(50), primary_key=True)  
    product_id = db.Column(db.String(36), db.ForeignKey('product.product_id'), nullable=False)
    size = db.Column(db.String(50), nullable=True)
    color = db.Column(db.String(50), nullable=True)
    inventory_count = db.Column(db.Integer, nullable=False, default=0)

class Cart(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey("user.id"), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
    
    # One-to-many relationship to CartItem
    items = db.relationship("CartItem", backref="cart", lazy=True, cascade="all, delete-orphan")
    
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "items": [item.to_dict() for item in self.items]
        }

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.String(36), db.ForeignKey("cart.id"), nullable=False)
    product_id = db.Column(db.String(36), db.ForeignKey("product.product_id"), nullable=False)
    variant_sku = db.Column(db.String(50), db.ForeignKey("product_variant.sku"), nullable=True)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
    product = db.relationship("Product", lazy=True)
    variant = db.relationship("ProductVariant", lazy=True, foreign_keys=[variant_sku])
    
    def to_dict(self):
        return {
            "id": self.id,
            "cart_id": self.cart_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "variant_sku": self.variant_sku,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "product": {
                "name": self.product.name,
                "new_price": self.product.new_price,
                "old_price": self.product.old_price,
                "product_image": self.product.product_image,
                "description": self.product.description,
                "tags": [tag.name for tag in self.product.tags],
            } if self.product else None,
            "variant": {
                "sku": self.variant.sku,
                "size": self.variant.size,
                "color": self.variant.color,
                "inventory_count": self.variant.inventory_count,
            } if self.variant else None
        }

class Order(db.Model):
    order_id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    order_value = db.Column(db.Float, nullable=False)
    address = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    order_items = db.relationship("OrderItem", back_populates="order")
    order_status = db.Column(db.String(20), nullable=False, default="Pending")
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)


class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(36), db.ForeignKey("order.order_id"), nullable=False)
    variant_sku = db.Column(db.String(36), db.ForeignKey("product_variant.sku"), nullable=True)
    quantity = db.Column(db.Integer, nullable=False)
    variant = db.relationship("ProductVariant", lazy=True)

    order = db.relationship("Order", back_populates="order_items")




# ------------------------- API Endpoints ------------------------- #

@app.route('/user_info')
@jwt_required()
def user_info():
    
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    print(user)
    return jsonify({
        "email": user.email,
        "mobile_number": user.mobile_number,
        "profileSetup": user.profile_setup,
        "address": user.address,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "gender": user.gender,
        "is_admin": user.is_admin
    }), 200

@app.route('/uploads/<filename>')
def upload_file(filename):
    upload_folder = current_app.config.get('UPLOAD_FOLDER', 'uploads')
    return send_from_directory(upload_folder, filename)

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        mobile_number = data.get("mobileNumber")
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
        new_user = User(email=email, password=hashed_password, mobile_number = mobile_number)

        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(identity=new_user.id)

        response = make_response(jsonify({
            "user": {
                "id": new_user.id,
                "email": new_user.email,
                "mobile_number": new_user.mobile_number,
                "profileSetup": new_user.profile_setup,
            }
        }), 201)

        response.set_cookie(
            "access_token",
            access_token,
            max_age=2 * 24 * 60 * 60,  
            httponly=True, 
            samesite="None",  
            secure=False,  

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
                "email": user.email,
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "mobile_number": user.mobile_number,
                "age": user.age,
                "gender": user.gender,
                "address": user.address,
                "is_admin": user.is_admin,
                "profile_setup": user.profile_setup

            }
        }), 200)

        response.set_cookie(
            "access_token",
            access_token,
            max_age=2 * 24 * 60 * 60,  
            httponly=True,  
            samesite="None",  
            secure=True,  

        )
        return response
    
    except Exception as e:
        print("login error:", str(e))
        return jsonify({"error": "Internal Server Error"}), 500
    
@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    response = make_response(jsonify({"message": "Logout successful"}))
    response.set_cookie("access_token", "", expires=0).status(200)  
    return response



@app.route('/profile_creation', methods=['POST'])
def profile_creation():
    verify_jwt_in_request(optional=True)
    user_id = get_jwt_identity()  
    data = request.get_json()

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.first_name = data.get("first_name", user.first_name)
    user.last_name = data.get("last_name", user.last_name)
    user.mobile_number = data.get("mobile_number", user.mobile_number)
    user.age = data.get("age", user.age)
    user.gender = data.get("gender", user.gender)
    user.address = data.get("address", user.address)
    user.profile_setup = True

    db.session.commit()  

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
            "address": user.address,
            "is_admin": user.is_admin,
            "profile_setup": user.profile_setup

        }
    }), 200


@app.route('/create_product', methods=['POST'])
@jwt_required()
def create_product():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or not user.is_admin:
        return jsonify({"error": "Admin access required"}), 403
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    
    name = data.get('name')
    new_price = data.get('new_price')
    print(data)
    if not name or new_price is None:
        return jsonify({'error': 'Name and new_price are required'}), 400

    try:
        
        product = Product(
            name=name,
            gender=data.get('gender'),
            old_price=data.get('old_price'),
            new_price=new_price,
            product_image=data.get('product_image'),
            description=data.get('description')
           
        )

        tags_data = data.get('tags', [])
        for tag_name in tags_data:
            tag = Tag.query.filter_by(name=tag_name).first()
            if not tag:
                tag = Tag(name=tag_name)
                db.session.add(tag)
            product.tags.append(tag)

        variants_data = data.get('variants', [])
        for variant_data in variants_data:
            variant = ProductVariant(
                sku=variant_data.get('sku'),
                size=variant_data.get('size'),
                color=variant_data.get('color'),
                inventory_count=variant_data.get('inventory_count', 0),
                product_id=product.product_id  
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
@jwt_required()
def edit_product(product_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user or not user.is_admin:
        return jsonify({"error": "Admin access required"}), 403

    data = request.get_json()
    print(data)
    if not data:
        return jsonify({"error": "No data provided"}), 400

    product = Product.query.filter_by(product_id=product_id).first()
    if not product:
        return jsonify({"error": "Product not found"}), 404

    product.name = data.get("name", product.name)
    product.gender = data.get("gender", product.gender)
    product.old_price = data.get("old_price", product.old_price)
    product.new_price = data.get("new_price", product.new_price)
    product.product_image = data.get("product_image", product.product_image)
    product.description = data.get("description", product.description)

    if "tags" in data:
        product.tags = []  
        for tag_name in data["tags"]:
            tag = Tag.query.filter_by(name=tag_name).first()
            if not tag:
                tag = Tag(name=tag_name)
                db.session.add(tag)
            product.tags.append(tag)

    if "sku" in data:
        sku = data["sku"]
        variant = ProductVariant.query.filter_by(sku=sku, product_id=product_id).first()
        if variant:
            variant.size = data.get("size", variant.size)
            variant.color = data.get("color", variant.color)
            variant.inventory_count = data.get("inventory_count", variant.inventory_count)
        else:
            return jsonify({"error": f"Variant with SKU {sku} not found"}), 404

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
@jwt_required()

def delete_product(product_id):
    

    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or not user.is_admin:
        return jsonify({"error": "Admin access required"}), 403
    
    
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
@jwt_required()
def product_image_upload():
    
    
    
    product_id = request.form.get("productId")
    if not product_id:
        return jsonify({"error": "Product ID is required"}), 400
    
    print("Product ID received:", product_id)
    print("Files received:", request.files)


    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or not user.is_admin:
        return jsonify({"error": "Admin access required"}), 403

    
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
@app.route("/api/cart", methods=["POST"])
@jwt_required()  
def add_to_cart():
    try:
        data = request.get_json()
        user_id = get_jwt_identity()  
        product_id = data.get("product_id")
        variant_sku = data.get("variant_sku")
        quantity = data.get("quantity", 1)

        if not product_id:
            return jsonify({"error": "Product ID is required"}), 400
        if quantity <= 0 or not isinstance(quantity, int):
            return jsonify({"error": "Quantity must be a positive integer"}), 400

        product = Product.query.get(product_id)
        if not product:
            return jsonify({"error": "Product not found"}), 404

        if variant_sku:
            variant = ProductVariant.query.filter_by(sku=variant_sku, product_id=product_id).first()
            if not variant:
                return jsonify({"error": "Invalid product variant"}), 404

        cart = Cart.query.filter_by(user_id=user_id).first()
        if not cart:
            cart = Cart(user_id=user_id)
            db.session.add(cart)

        cart_item = CartItem.query.filter_by(cart_id=cart.id, product_id=product_id, variant_sku=variant_sku).first()
        if cart_item:
            cart_item.quantity += quantity  
        else:
            cart_item = CartItem(cart_id=cart.id, product_id=product_id, variant_sku=variant_sku, quantity=quantity)
            db.session.add(cart_item)

        db.session.commit()
        return jsonify({"message": "Item added to cart", "cart": cart.to_dict()}), 200

    except Exception as e:
        logging.error(f"Error adding to cart: {str(e)}")
        db.session.rollback()
        return jsonify({"error": "An error occurred while adding to cart"}), 500
    

@app.route("/api/cart", methods=["GET"])
@jwt_required()        
def get_cart():
    
    user_id = get_jwt_identity()  
    
    cart = Cart.query.filter_by(user_id=user_id).first()
    if not cart:
        return jsonify({"error": "Cart not found"}), 404

    return jsonify(cart.to_dict()), 200

@app.route("/api/cart", methods=["DELETE"])
@jwt_required()
def clear_cart():
    user_id = get_jwt_identity()  
    cart = Cart.query.filter_by(user_id=user_id).first()
    if not cart:
        return jsonify({"error": "Cart not found"}), 404

    CartItem.query.filter_by(cart_id=cart.id).delete()  # Bulk delete items
    db.session.commit()

    return jsonify({"message": "Cart cleared successfully"}), 200

@app.route("/api/cart/<int:item_id>", methods=["DELETE"])
@jwt_required()
def remove_from_cart(item_id):
    user_id = get_jwt_identity()
    cart = Cart.query.filter_by(user_id=user_id).first()
    
    if not cart:
        return jsonify({"error": "Cart not found"}), 404

    cart_item = CartItem.query.filter_by(id=item_id, cart_id=cart.id).first()
    
    if not cart_item:
        return jsonify({"error": "Item not found in cart"}), 404

    quantity_to_remove = request.args.get("quantity", type=int, default=cart_item.quantity)

    if quantity_to_remove < 1:
        return jsonify({"error": "Invalid quantity"}), 400

    if cart_item.quantity > quantity_to_remove:
        cart_item.quantity -= quantity_to_remove
    else:
        db.session.delete(cart_item)
    
    db.session.commit()

    return jsonify({"message": f"Removed {quantity_to_remove} items from cart"}), 200

@app.route("/api/cart/checkout", methods=["POST"])
@jwt_required()
def place_order():
    
    user_id = get_jwt_identity()
       
    
    cart = Cart.query.filter_by(user_id=user_id).first()
    if not cart or not cart.items:
        return jsonify({"error": "Cart is empty"}), 400

    
    user = User.query.get(user_id)
    
    address = request.json.get("address", user.address)
    if not address:
        return jsonify({"error": "No address provided"}), 400

    order_value = sum(item.product.new_price * item.quantity for item in cart.items if item.product and item.product.new_price is not None)

    new_order = Order(user_id=user_id, order_value=order_value, order_status="Pending", address=address)
    db.session.add(new_order)
    db.session.flush()  

    
    for item in cart.items:
        order_item = OrderItem(
            order_id=new_order.order_id,
            variant_sku=item.variant_sku,
            quantity=item.quantity
        )
        db.session.add(order_item)

    
    CartItem.query.filter_by(cart_id=cart.id).delete()
    
    db.session.commit()
    return jsonify({"message": "Order placed successfully!", "order_id": new_order.order_id, "address": new_order.address}), 201

@app.route("/api/orders", methods=["GET"])
@jwt_required()
def get_all_orders():
    
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)
    user_id = get_jwt_identity()

    user = User.query.get(user_id)
    if not user or not user.is_admin:
        return jsonify({"error": "Unauthorized"}), 403

    query = Order.query
    paginated_orders = query.order_by(Order.created_at.desc()).paginate(page=page, per_page=per_page, error_out=False)
    

    orders = [{
        "order_id": order.order_id,
        "user_id": order.user_id,
        "order_value": order.order_value,
        "order_items":[{
            "quantity": item.quantity,
            "variant_sku": item.variant_sku,
            "name": item.variant.product.name,
            "price": item.variant.product.new_price,
            } for item in order.order_items],
        "order_status": order.order_status,
        "created_at": order.created_at.isoformat()
    } for order in paginated_orders]


    return jsonify({"data": orders,
        "meta": {
            "totalPages": paginated_orders.pages,
            "currentPage": page,
            "perPage": per_page,
            "totalItems": paginated_orders.total
        }
    }), 200

@app.route("/api/orders/user", methods=["GET"])
@jwt_required()
def get_user_orders():
    user_id = get_jwt_identity()
    orders = Order.query.filter_by(user_id=user_id).all()

    return jsonify([{
        "order_id": order.order_id,
        "order_value": order.order_value,
        "order_status": order.order_status,
        "order_items":[{
            "quantity": item.quantity,
            "variant_sku": item.variant_sku,
            "name": item.variant.product.name,
            "new_price": item.variant.product.new_price,
            "product_image": item.variant.product.product_image,
            "size": item.variant.size,
            "color": item.variant.color,
            "gender": item.variant.product.gender
            
            
            } for item in order.order_items],
        "created_at": order.created_at.isoformat()
    } for order in orders]), 200


@app.route("/api/orders/<order_id>", methods=["PATCH"])
@jwt_required()
def update_order_status(order_id):
    user_id = get_jwt_identity()

    # Check admin access
    user = User.query.get(user_id)
    if not user or not user.is_admin:
        return jsonify({"error": "Unauthorized"}), 403

    order = Order.query.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404

    data = request.json
    if "order_status" in data:
        order.order_status = data["order_status"]

    db.session.commit()
    return jsonify({"message": "Order status updated", "order_id": order.order_id})








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
        "color": product.color,
        "old_price": product.old_price,
        "new_price": product.new_price,
        "product_image": product.product_image,
        "description": product.description
    }

    return jsonify(product_data), 200

@app.route("/api/products" ,methods=["POST"])
def data_table_products():

    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)

    verify_jwt_in_request(optional=True)

    data = request.get_json() or {}
    filters = data.get("filters", {})

    query = Product.query

    for key, value in filters.items():

        if key == "tags" and isinstance(value, list) and value:
            query = query.filter(Product.tags.any(Tag.name.in_(value)))
        elif hasattr(Product, key) and key not in ["sort", "random"]:
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

    paginated_products = query.paginate(page=page, per_page=per_page, error_out=False)

    products = [{
        "product_id": product.product_id,
        "name": product.name,
        "gender": product.gender,
        "old_price": product.old_price,
        "new_price": product.new_price,
        "product_image": product.product_image,
        "description": product.description,
        "tags": [tag.name for tag in product.tags], 
        "variants": [{
            "sku": variant.sku,
            "size": variant.size,
            "color": variant.color,
            "inventory_count": variant.inventory_count,
            "product_id": variant.product_id
        } for variant in product.variants]
    } for product in paginated_products.items]

    
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
