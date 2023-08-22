import json

from models.model import Model

def handler(event, context):
    print('received event:')
    print(event)

    # Get Model from json input
    modelDic = event['model']
    modelData = Model(modelDic)

    # Solve model
    modelData.solve()

    # Print JSON
    print(modelData.getDict())
  
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': modelData.getDict()
    }

if __name__=='__main__':
    with open('event.json') as f:
        event = json.load(f)
        handler(event, None)