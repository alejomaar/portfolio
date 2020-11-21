from flask import Flask, render_template, make_response, request
import  PIL
from PIL import Image
import numpy as np
import cv2

#from edge import edges


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
@app.route('/edges')
def edges():
    return render_template('edgeimg.html')

@app.route('/edges_image')
def edges_image():
    img = cv2.imread("static/Image/leonblueprint.jpg")
    imgedges = cv2.resize(img,(1200,600))
    img= cv2.Canny(imgedges,80,200)
    
    retval, buffer = cv2.imencode('.png',img)
    response = make_response(buffer.tobytes())
    response.headers['Content-Type'] = 'image/png'
    
    return response

@app.route('/edgesnew')
def edgesnew():
    return render_template('program/PyEdges.html')

@app.route('/edgesnewpost',methods=['POST'])
def edgesnewpost():
    if request.method == 'POST':
        #imageload = request.files['picture'];

        img = PIL.Image.open(request.files['picture'].stream)
        opencvImage = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)

        

        #return opencvImage.__class__.__name__
        #return render_template('program/PyEdges.html')


if __name__ == '__main__':
    app.run(debug=True)