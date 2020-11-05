from flask import Flask, render_template

app =Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/program')
def program():
    return render_template('program.html')

if __name__ == '__main__':
    app.run(debug=True)