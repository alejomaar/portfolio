
import cv2

def edges():
    img = cv2.imread("static/Image/esfinge.png")
    imgedges = cv2.resize(img,(1200,600))
    imgedges= cv2.Canny(imgedges,40,200)
    imgedges = cv2.imencode('.jpg',imgedges)[1].tobytes();
    return imgedges

    