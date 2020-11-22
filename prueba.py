from flask import Flask, render_template, make_response, request
import  PIL
from PIL import Image
import numpy as np
import cv2
import os
from io import BytesIO
import base64

#from edge import edges


app =Flask(__name__)
app.config['UPLOAD_FOLDER']= os.path.join('static','Image')

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

    return render_template('edgeimg.html' )
    
    #return response

@app.route('/edgesnew')
def edgesnew():
    return render_template('program/PyEdges.html')

@app.route('/edgesnewpost',methods=['POST'])
def edgesnewpost():
    if request.method == 'POST':
        img = PIL.Image.open(request.files['picture'].stream)
        opencvImage = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)

        imgedges = cv2.resize(opencvImage,(1200,600))
        img= cv2.Canny(imgedges,80,200)
    
        retval, buffer = cv2.imencode('.png',img)
        response = make_response(buffer.tobytes())
        response.headers['Content-Type'] = 'image/png'

        return response

        #return im_b64.__class__.__name__

      


if __name__ == '__main__':
    app.run(debug=True)