from flask import Flask, render_template

app =Flask(__name__)

@app.route('/')
def home():
    #return render_template('program/'+name)
    return render_template('index.html')

@app.route('/app/<string:name>')
def program(name='escalagrises.html'):
    return render_template('program/'+name)
    #return name;
    #return 'File: '+name
    

if __name__ == '__main__':
    app.run(debug=True)