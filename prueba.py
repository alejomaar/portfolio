from flask import Flask, render_template, request,make_response,jsonify
import  PIL
from PIL import Image
import numpy as np
import cv2
import os
import math
from io import BytesIO

#from edge import edges


app =Flask(__name__)
app.config['UPLOAD_FOLDER']= os.path.join('static','userimageload')
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

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

GeneralImg=None

@app.route('/edges_image/<string:filename>')
def edges_image(filename):
    route = "static/userimageload/"+filename
    
    img = cv2.imread(route)
    factor = 900/img.shape[0]
    img = cv2.resize(img,(0,0), fx=factor,fy=factor)
    img = cv2.bilateralFilter(img,9,300,300)


    gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    gray = cv2.medianBlur(gray,7)
    
    kernel=cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(6,6))
    edges = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,11,5)
    edges = cv2.morphologyEx(edges, cv2.MORPH_OPEN, kernel)

    color = ImgPosterized(img)
    color = Binarized(color,edges)
    #cartoon = cv2.bitwise_and(color,color,mask=edges)
    
    success, buffer = cv2.imencode('.png',color)
    response = make_response(buffer.tobytes())
    response.headers['Content-Type'] = 'image/png'
    #return render_template('edgeimg.html' )
    #return route
    return response



@app.route('/edgesnew',methods=['POST','GET'])
def edgesnewpost():
    if request.method == 'POST':
        
        File = request.files['picture'].read()
        npimg = np.fromstring(File, np.uint8)
        routeOriginal = "static/userimageload/original.png"
        routeNew = "static/userimageload/new.png"

        img = cv2.imdecode(npimg,cv2.IMREAD_COLOR)
        cv2.imwrite(routeOriginal,img)

        img = ImgEffect(img)
        cv2.imwrite(routeNew,img)

        return jsonify({"locationOld":routeOriginal,"locationNew":routeNew})
    else:
        return render_template('program/PyEdges.html')

def ImgEffect(img):
    factor = 900/img.shape[0]
    img = cv2.resize(img,(0,0), fx=factor,fy=factor)
    img = cv2.bilateralFilter(img,9,300,300)

    gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    gray = cv2.medianBlur(gray,7)
    
    #
    # kernel=cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(6,6))
    edges = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,11,5)
    #edges = cv2.morphologyEx(edges, cv2.MORPH_OPEN, kernel)

    color = ImgPosterized(img)
    color = Binarized(color,edges)
    return color

def ImgPosterized(img):
    return 32*np.floor(img/32)

def Binarized(img,mask):
    img[mask==0]=(img[mask==0]*0.3+0*0.7)
    return img


if __name__ == '__main__':
    app.run(debug=True)