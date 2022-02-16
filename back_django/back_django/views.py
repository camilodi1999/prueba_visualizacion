from django.http import HttpResponse
import pandas as pd
import json


data_frame  =  pd.read_csv('viajes x modo ij.csv',sep=';')
zona_origen = data_frame['zone_0'].unique().tolist()
modos_transport = data_frame['attr_0'].unique().tolist()

def first_time(request):
    print('entro')
    response = data_frame[(data_frame["zone_0"] == zona_origen[0]) & (data_frame["attr_0"] == modos_transport[0]) ]   
    return HttpResponse(response.to_json(orient="index"))

def params(request):
    json_response = json.dumps({'zona':zona_origen, 'modos':modos_transport})
    return HttpResponse(json_response)


def data(request):
    zona = request.GET.get('zona','')
    modo_T = request.GET.get('modo','')
    print((data_frame["zone_0"] == int(zona)))
    response = data_frame[(data_frame["zone_0"] == int(zona)) & (data_frame["attr_0"] == modo_T) ]   
    return HttpResponse(response.to_json(orient="index"))
