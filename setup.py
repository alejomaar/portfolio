from flask import Flask, render_template, request,make_response,jsonify
import numpy as np
import cv2

app =Flask(__name__)

@app.route('/')
def home():
    #return render_template('program/fractal.html')
    return render_template('index.html')

@app.route('/app/<string:name>', methods=['GET'])
def program(name):
    return render_template('program/'+name+'.html')
    #return name;
    #return 'File: '+name

@app.route('/edges',methods=['POST','GET'])
def edges():
    if request.method == 'POST':
        
        File = request.files['picture'].read()
        npimg = np.fromstring(File, np.uint8)
        img = cv2.imdecode(npimg,cv2.IMREAD_COLOR)

        factor = 900/img.shape[0]
        img = cv2.resize(img,(0,0), fx=factor,fy=factor)
        img = ImgEffect(img)

        success, buffer = cv2.imencode('.png',img)
        response = make_response(buffer.tobytes())
        response.headers['Content-Type'] ='image/png'
        return response
    else:
        return "none"


def ImgEffect(img):
     
    gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    gray = cv2.medianBlur(gray,5)
    edges = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,25,3)
    
    kernel=cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(17,17))
    img = cv2.bilateralFilter(img,9,300,300)
    img = cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)
    
    color = cv2.medianBlur(img,3)
    color = ImgPosterized(color)
    color = Binarized(color,edges)
    return color

def ImgPosterized(img):
    return 32*np.floor(img/32)

def Binarized(img,mask):
    img[mask==0]=(img[mask==0]*0.3+0*0.7)
    return img    

if __name__ == '__main__':
    app.run(debug=True)


