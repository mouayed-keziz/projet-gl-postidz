from flask import jsonify,Blueprint


advertisement_router = Blueprint('advertisement', __name__)


@advertisement_router.route("/advertisement", methods=["GET"])
def get_api():
    return jsonify({"msg": "advertisement router"})

