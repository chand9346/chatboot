from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os

# Make sure to replace with your actual API key
genai.configure(api_key="AIzaSyCHCLw1M7yuvv2KA95eFNWQBn-VBdPh9bk")


model = genai.GenerativeModel("gemini-1.5-flash")
chat = model.start_chat(history=[])

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def get_response():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "No message provided"}), 400
    
    try:
        # Send message to chat and get response
        response_raw = chat.send_message(user_input)
        print(response_raw)
        response = response_raw.text
        return jsonify({"response": response})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
