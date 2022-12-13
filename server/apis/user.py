from flask import jsonify,Blueprint,request
from werkzeug.security import check_password_hash
from app import User
from app import db  

user_router = Blueprint('user', __name__)

@user_router.route("/", methods=["GET"])
def get_root():
    return jsonify  


@user_router.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        # password matches
        response = jsonify({"id": user.id, "name": user.name, "email": user.email, "phone": user.phone, "imgurl": user.imgurl})
        response.status_code = 200
        return response
    else:
        # user not found or password mismatch
        response = jsonify({"error": "Invalid email or password"})
        response.status_code = 401
        return response


@user_router.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone")
    imgurl = data.get("imgurl")

    user = User(name=name, email=email, password=password, phone=phone, imgurl=imgurl)
    
    db.session.add(user)
    db.session.commit()
    response = jsonify({"id": user.id, "name": user.name, "email": user.email, "phone": user.phone, "imgurl": user.imgurl})
    response.status_code = 201
    return response