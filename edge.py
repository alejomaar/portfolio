import numpy as np
import math
import sys


def aprox(x):
    return x==255

a= np.array([255,126,30,255,25], dtype=np.uint8)
a2= np.array([10,20,30,24,25], dtype=np.uint8)
#b=np.where(a==255)[0]
a2[a==255]=0
print(a2)





    