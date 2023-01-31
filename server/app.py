
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
import os
import uuid
from datetime import datetime
import requests
from bs4 import BeautifulSoup



app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


# --------------------------------------------------------------------------------------


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String, nullable=True)
    phone = db.Column(db.String)
    imgurl = db.Column(db.String, nullable=True)
    advertisements = db.relationship("Advertisement", back_populates="creator")
    liked_advertisements = db.relationship(
        "Advertisement", secondary="user_likes")
    conversations = db.relationship(
        "Conversation", secondary="conversation_participants", back_populates="users")
    messages = db.relationship("Message", back_populates="user")

    def __init__(self, id, name, email, password, phone, imgurl):
        self.id = id
        if (password):
            self.password = password
        self.name = name
        self.email = email
        self.phone = phone
        self.imgurl = imgurl

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "imgurl": self.imgurl,
        }


class Advertisement(db.Model):
    __tablename__ = 'advertisements'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String)
    category = db.Column(db.String)
    theme = db.Column(db.String)
    mode = db.Column(db.String)
    description = db.Column(db.Text)
    price = db.Column(db.Integer)
    wilaya = db.Column(db.String)
    commune = db.Column(db.String)
    adress = db.Column(db.String)
    creator_id = db.Column(db.String, db.ForeignKey('users.id'))
    creator = db.relationship("User", back_populates="advertisements")
    images = db.relationship("Image", back_populates="advertisement")
    user_likes = db.relationship("User", secondary="user_likes")

    def __init__(self, date, category, theme, mode, description, price, wilaya, commune, adress):
        self.date = date
        self.category = category
        self.theme = theme
        self.mode = mode
        self.description = description
        self.price = price
        self.wilaya = wilaya
        self.commune = commune
        self.adress = adress

    def to_dict(self):
        return {
            "id": self.id,
            "date": self.date,
            "category": self.category,
            "theme": self.theme,
            "mode": self.mode,
            "description": self.description,
            "price": self.price,
            "wilaya": self.wilaya,
            "commune": self.commune,
            "adress": self.adress,
            "creator_id": self.creator_id,
            "images": [image.url for image in self.images],
            "creator_id": self.creator.id,
            "creator_name": self.creator.name,
        }


class Image(db.Model):
    __tablename__ = 'images'
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String)
    advertisement_id = db.Column(
        db.Integer, db.ForeignKey('advertisements.id'))
    advertisement = db.relationship("Advertisement", back_populates="images")

    def __init__(self, url, advertisement):
        self.url = url
        self.advertisement = advertisement


class UserLikes(db.Model):
    __tablename__ = 'user_likes'
    user_id = db.Column(db.String, db.ForeignKey(
        'users.id'), primary_key=True)
    advertisement_id = db.Column(db.Integer, db.ForeignKey(
        'advertisements.id'), primary_key=True)


class ConversationParticipants(db.Model):
    __tablename__ = 'conversation_participants'
    conversation_id = db.Column(db.Integer, db.ForeignKey(
        'conversations.id'), primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey(
        'users.id'), primary_key=True)


class Conversation(db.Model):
    __tablename__ = 'conversations'
    id = db.Column(db.Integer, primary_key=True)
    users = db.relationship(
        "User", secondary="conversation_participants", back_populates="conversations")
    messages = db.relationship("Message", back_populates="conversation")

    def to_dict(self, user_id):
        other_user = [user for user in self.users if user.id != (user_id)]
        return {
            "id": self.id,
            "name": other_user[0].name,
            "participant_id": other_user[0].id,
            "participant_imgurl": other_user[0].imgurl,
        }


class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'))
    conversation = db.relationship("Conversation", back_populates="messages")
    user_id = db.Column(db.String, db.ForeignKey('users.id'))
    user = db.relationship("User", back_populates="messages")

    def __init__(self, text, conversation_id, user_id):
        self.text = text
        self.conversation_id = conversation_id
        self.user_id = user_id

    def to_dict(self):
        return {
            "id": self.id,
            "text": self.text,
            "conversation_id": self.conversation_id,
            "user_id": self.user_id,
            "user_name": self.user.name,
            "user_imgurl": self.user.imgurl,
        }

# --------------------------------------------------------------------------------------


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        # password matches
        response = jsonify({"id": user.id, "name": user.name,
                           "email": user.email, "phone": user.phone, "imgurl": user.imgurl})
        response.status_code = 200
        return response
    else:
        # user not found or password mismatch
        response = jsonify({"error": "Invalid email or password"})
        response.status_code = 401
        return response


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone")
    imgurl = data.get("imgurl")
    id = str(uuid.uuid4())

    password = generate_password_hash(password)

    if not imgurl:
        imgurl = None

    user = User(id=id, name=name, email=email, password=password,
                phone=phone, imgurl=imgurl)
    db.session.add(user)
    db.session.commit()
    # try:
    # except:
    # response = jsonify({"error": "User already exists"})
    # response.status_code = 409
    # return response
    response = jsonify({"id": user.id, "name": user.name,
                       "email": user.email, "phone": user.phone, "imgurl": user.imgurl})
    response.status_code = 201
    return response


@app.route("/update-user", methods=["PUT"])
def update_user():
    data = request.get_json()
    user_id = data.get("user_id")
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    imgurl = data.get("imgurl")

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if name:
        user.name = name
    if email:
        user.email = email
    if phone:
        user.phone = phone
    if imgurl:
        user.imgurl = imgurl

    db.session.commit()

    response = jsonify({"id": user.id, "name": user.name,
                       "email": user.email, "phone": user.phone, "imgurl": user.imgurl})
    response.status_code = 201
    return response


@app.route("/update-password", methods=["PUT"])
def update_password():
    data = request.get_json()
    user_id = data.get("user_id")
    current_password = data.get("current_password")
    new_password = data.get("new_password")

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if not check_password_hash(user.password, current_password):
        return jsonify({"error": "Incorrect password"})

    user.password = generate_password_hash(new_password)
    db.session.commit()

    response = jsonify({"id": user.id, "name": user.name,
                       "email": user.email, "phone": user.phone, "imgurl": user.imgurl})
    response.status_code = 201
    return response


@app.route("/new-advertisement", methods=["POST"])
def new_advertisement():
    data = request.get_json()
    user_id = data.get("user_id")
    date = datetime.now()
    category = data.get("category")
    theme = data.get("theme")
    mode = data.get("mode")
    description = data.get("description")
    price = data.get("price")
    wilaya = data.get("wilaya")
    commune = data.get("commune")
    adress = data.get("adress")
    images = data.get("images", [])

    if not all([user_id, date, category, theme, mode, description, price, wilaya, commune, adress, images]):
        return jsonify({"error": "Incomplete data. All fields are required."}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Invalid user_id"}), 400

    advertisement = Advertisement(
        date, category, theme, mode, description, price, wilaya, commune, adress)
    advertisement.creator = user

    for image_url in images:
        image = Image(image_url, advertisement)
        db.session.add(image)

    db.session.add(advertisement)
    db.session.commit()

    # return the id of the advertisement
    return jsonify({"id": advertisement.id}), 201


@app.route("/number-of-advertisements", methods=["GET"])
def number_of_advertisements():
    number = Advertisement.query.count()
    return jsonify({"number_of_advertisements": number}), 200


@app.route("/advertisements/<int:advertisement_id>", methods=["GET"])
def get_advertisement(advertisement_id):
    advertisement = Advertisement.query.get(advertisement_id)
    if advertisement:
        ad = {
            "id": advertisement.id,
            "date": advertisement.date,
            "category": advertisement.category,
            "theme": advertisement.theme,
            "mode": advertisement.mode,
            "description": advertisement.description,
            "price": advertisement.price,
            "wilaya": advertisement.wilaya,
            "commune": advertisement.commune,
            "adress": advertisement.adress,
            "creator_id": advertisement.creator_id,
            "creator_name": advertisement.creator.name,
            "images": [image.url for image in advertisement.images]
        }
        return jsonify({"advertisement": ad}), 200
    else:
        return jsonify({"error": "Advertisement not found."}), 404


@app.route("/edit-advertisement/<int:id>", methods=["PUT"])
def edit_advertisement(id):
    data = request.get_json()
    date = data.get("date")
    category = data.get("category")
    theme = data.get("theme")
    mode = data.get("mode")
    description = data.get("description")
    price = data.get("price")
    wilaya = data.get("wilaya")
    commune = data.get("commune")
    adress = data.get("adress")
    images = data.get("images", [])

    if not all([date, category, theme, mode, description, price, wilaya, commune, adress, images]):
        return jsonify({"error": "Incomplete data. All fields are required."}), 400

    advertisement = Advertisement.query.get(id)
    if not advertisement:
        return jsonify({"error": "Advertisement not found"}), 404

    advertisement.date = date
    advertisement.category = category
    advertisement.theme = theme
    advertisement.mode = mode
    advertisement.description = description
    advertisement.price = price
    advertisement.wilaya = wilaya
    advertisement.commune = commune
    advertisement.adress = adress

    for image_url in images:
        image = Image(image_url, advertisement)
        db.session.add(image)

    db.session.commit()

    return jsonify({"success": "Advertisement edited successfully"}), 201


@app.route("/delete-advertisement/<int:id>", methods=["DELETE"])
def delete_advertisement(id):
    advertisement = Advertisement.query.get(id)
    if not advertisement:
        return jsonify({"error": "Advertisement not found"}), 404
    db.session.delete(advertisement)
    db.session.commit()
    return jsonify({"message": "Advertisement deleted successfully"}), 200


@app.route("/recent-advertisements/", methods=["GET"])
def recent_ads():
    limit = 8

    advertisements = (
        db.session.query(Advertisement)
        .order_by(Advertisement.id.desc())
        .limit(limit)
        .all()
    )

    advertisements_data = [advertisement.to_dict()
                           for advertisement in advertisements]
    response = jsonify(advertisements_data)
    #response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/like-advertisement", methods=["POST"])
def like_advertisement():
    data = request.get_json()
    user_id = data.get("user_id")
    ad_id = data.get("ad_id")

    if not user_id:
        return jsonify({"error": "user_id is required."}), 400

    advertisement = Advertisement.query.get(ad_id)
    if not advertisement:
        return jsonify({"error": "Advertisement not found."}), 404

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found."}), 404

    if user in advertisement.user_likes:
        advertisement.user_likes.remove(user)
        db.session.commit()
        return jsonify({"message": "Advertisement unliked successfully."}), 200
    else:
        advertisement.user_likes.append(user)
        db.session.commit()
        return jsonify({"message": "Advertisement liked successfully."}), 200


@app.route("/user-advertisements/<string:user_id>", methods=["GET"])
def get_user_advertisements(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"error": "User not found"}), 404

    advertisements = user.advertisements
    return jsonify([advertisement.to_dict() for advertisement in advertisements]), 200

# api of search
# Filtrer les résultats de recherche selon :
# Le module (cours) de l’annonce ,
# La Wilaya,
# La commune d’une Wilaya,
# Période entre deux dates de publication


@app.route("/search-advertisement", methods=["POST"])
def search():
    data = request.get_json()
    category = data.get("category")
    wilaya = data.get("wilaya")
    commune = data.get("commune")
    date_from = data.get("date_from")
    date_to = data.get("date_to")
    theme = data.get("theme")
    description = data.get("description")

    advertisements = Advertisement.query

    if category:
        advertisements = advertisements.filter_by(category=category)
    if wilaya:
        advertisements = advertisements.filter_by(wilaya=wilaya)
    if commune:
        advertisements = advertisements.filter_by(commune=commune)
    if date_from:
        advertisements = advertisements.filter(Advertisement.date >= date_from)
    if date_to:
        advertisements = advertisements.filter(Advertisement.date <= date_to)
    if theme:
        advertisements = advertisements.filter(
            Advertisement.theme.like(f"%{theme}%"))
    if description:
        advertisements = advertisements.filter(
            Advertisement.description.like(f"%{description}%"))

    advertisements = advertisements.all()

    return jsonify([advertisement.to_dict() for advertisement in advertisements]), 200


@app.route("/start-conversation", methods=["POST"])
def start_conversation():
    data = request.get_json()
    user_id = data.get("user_id")
    receiver_id = data.get("receiver_id")

    if not all([user_id, receiver_id]):
        return jsonify({"error": "Incomplete data. All fields are required."}), 400

    user1 = User.query.get(user_id)
    user2 = User.query.get(receiver_id)

    if not user1 or not user2:
        return jsonify({"error": "Invalid user_id"}), 400

    if user1 == user2:
        return jsonify({"error": "cannot have conversation with yourself"}), 400

        # if the conversation exists, return the id of the conversation

    conversation_participants = ConversationParticipants.query.filter_by(
        user_id=user_id).all()
    for conversation_participant in conversation_participants:
        conversation = Conversation.query.get(
            conversation_participant.conversation_id)
        if user2 in conversation.users:
            return jsonify({"conversation_id": conversation.id}), 200

    conversation = Conversation()
    db.session.add(conversation)
    db.session.commit()

    conversation_participants = ConversationParticipants(
        conversation_id=conversation.id, user_id=user_id)
    db.session.add(conversation_participants)
    db.session.commit()

    conversation_participants = ConversationParticipants(
        conversation_id=conversation.id, user_id=receiver_id)
    db.session.add(conversation_participants)
    db.session.commit()

    # return the id of the conversation

    return jsonify({"conversation_id": conversation.id}), 201


@app.route("/conversation-exists", methods=["POST"])
def conversation_exists():
    data = request.get_json()
    user_id = data.get("user_id")
    receiver_id = data.get("receiver_id")

    if not all([user_id, receiver_id]):
        return jsonify({"error": "Incomplete data. All fields are required."}), 400

    user1 = User.query.get(user_id)
    user2 = User.query.get(receiver_id)

    if not user1 or not user2:
        return jsonify({"error": "Invalid user_id"}), 400

    if user1 == user2:
        return jsonify({"error": "cannot have conversation with yourself"}), 400

    conversation_participants = ConversationParticipants.query.filter_by(
        user_id=user_id).all()
    for conversation_participant in conversation_participants:
        conversation = Conversation.query.get(
            conversation_participant.conversation_id)
        if user2 in conversation.users:
            return jsonify({"conversation_id": conversation.id}), 200

    return jsonify({"error": "Conversation does not exist"}), 404


@app.route("/user-conversations", methods=["POST"])
def user_conversations():
    data = request.get_json()
    user_id = data.get("user_id")
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Invalid user_id"}), 400

    conversation_participants = ConversationParticipants.query.filter_by(
        user_id=user_id).all()
    conversations = []

    for conversation_participant in conversation_participants:
        conversations.append(Conversation.query.get(
            conversation_participant.conversation_id))

    return jsonify({"conversations": [conversation.to_dict(user_id) for conversation in conversations]}), 200


@app.route("/send-message", methods=["POST"])
def send_message():
    data = request.get_json()
    user_id = data.get("user_id")
    conversation_id = data.get("conversation_id")
    message = data.get("message")

    if not all([user_id, conversation_id, message]):
        return jsonify({"error": "Incomplete data. All fields are required."}), 400

    user = User.query.get(user_id)
    conversation = Conversation.query.get(conversation_id)

    if not user or not conversation:
        return jsonify({"error": "Invalid user_id or conversation_id"}), 400

    conversation_message = Message(
        conversation_id=conversation_id, user_id=user_id, text=message)
    db.session.add(conversation_message)
    db.session.commit()

    return jsonify({"success": "Message sent successfully"}), 201

# api that takes a use id and a conversation id and returns the data of the other user in the conversation


@app.route("/conversation-partner", methods=["POST"])
def conversation_partner():
    data = request.get_json()
    user_id = data.get("user_id")
    conversation_id = data.get("conversation_id")

    if not all([user_id, conversation_id]):
        return jsonify({"error": "Incomplete data. All fields are required."}), 400

    user = User.query.get(user_id)
    conversation = Conversation.query.get(conversation_id)

    if not user or not conversation:
        return jsonify({"error": "Invalid user_id or conversation_id"}), 400

    conversation_participants = ConversationParticipants.query.filter_by(
        conversation_id=conversation_id).all()
    for conversation_participant in conversation_participants:
        if conversation_participant.user_id != user_id:
            return jsonify({"partner": User.query.get(conversation_participant.user_id).to_dict()}), 200

    return jsonify({"error": "Invalid conversation_id"}), 400


@app.route("/conversation-messages", methods=["POST"])
def conversation_messages():
    data = request.get_json()
    user_id = data.get("user_id")
    conversation_id = data.get("conversation_id")

    if not all([user_id, conversation_id]):
        return jsonify({"error": "Incomplete data. All fields are required."}), 400

    user = User.query.get(user_id)
    conversation = Conversation.query.get(conversation_id)

    if not user or not conversation:
        return jsonify({"error": "Invalid user_id or conversation_id"}), 400

    messages = Message.query.filter_by(conversation_id=conversation_id).all()
    return jsonify({"messages": [message.to_dict() for message in messages]}), 200


@app.route("/google-signup", methods=["POST"])
def google_signup():
    data = request.get_json()
    name = data.get("name")
    id = data.get("id")
    email = data.get("email")
    phone = data.get("phone")
    imgurl = data.get("imgurl")

    if not all([name, id, email, imgurl]):
        return jsonify({"error": "Incomplete data. All fields are required."}), 400

    user = User.query.get(id)
    if not user:
        user = User(id=id, name=name, email=email,
                    phone=phone, imgurl=imgurl, password="google-has-no-password")
        db.session.add(user)
        db.session.commit()

    # return all infos of user
    return jsonify({"id": user.id, "email": user.email, "name": user.name, "imgurl": user.imgurl, "phone": user.phone}), 200


# create an api that takes a product id and returns the data of the user who posted it
@app.route("/advertisement-owner", methods=["POST"])
def advertisement_owner():
    data = request.get_json()
    advertisement_id = data.get("advertisement_id")

    if not advertisement_id:
        return jsonify({"error": "Incomplete data. All fields are required."}), 400

    advertisement = Advertisement.query.get(advertisement_id)
    if not advertisement:
        return jsonify({"error": "Invalid product_id"}), 400

    user = User.query.get(advertisement.creator_id)
    return jsonify({"id": user.id, "email": user.email, "name": user.name, "imgurl": user.imgurl, "phone": user.phone}), 200

@ads_bp.route('/conversation/<int:conversation_id>', methods=['GET', 'POST'])
def conversation(conversation_id):
    if request.method == 'POST':
        # send a new message
        conversation = Conversation.query.get(conversation_id)
        message = Message(
            conversation_id=conversation.id, 
            sender_id=request.json['sender_id'], 
            content=request.form.get('content')
        )
        db.session.add(message)
        db.session.commit()
        return jsonify({'message': 'Message sent successfully'})
    else:
        # display conversation and messages
        conversation = Conversation.query.get(conversation_id)
        messages = Message.query.filter_by(conversation_id=conversation_id).all()
        response = {
            'conversation': conversation.to_dict(),
            'messages': [message.to_dict() for message in messages]
        }
        return jsonify(response)

#web scraping route
@app.route('/scraping', methods=['GET'])
def scraping():
    response = requests.get("https://www.algerieannonces.com/categorie/391/Multi-Services/Cours-de-soutien/3.html")
    soup = BeautifulSoup(response.text, 'html.parser')
    
    annonces = []
    
    # Find all the 'li' elements that contain an annonce
    for li in soup.find_all('li'):
        try:
            title = li.find("h3").find("a").text
        except AttributeError:
            title = None
        try:
            price = li.find('strong', {'class': 'price'}).text
        except AttributeError:
            price = None
        try:
            location = li.find('span', {'class': 'location'}).text
        except AttributeError:
            location = None
        annonces.append({'title': title, 'price': price, 'location': location})

    return jsonify(annonces)


# --------------------------------------------------------------------------------------
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    # from apis.user import user_router
    # from apis.advertisement import advertisement_router
    # app.register_blueprint(user_router)
    # app.register_blueprint(advertisement_router)
    app.run(debug=True)
