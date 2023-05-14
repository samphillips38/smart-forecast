import json
from getFakeData import getFakeData
from runModel import runModel

def handler(event, context):
    print('received event:')
    print(event)
    
    body = None

    path = event['path']
    if "/models" in path:
        body = getFakeData()
    elif '/runmodel/' in path:
        model = json.loads(event['body'])
        print(f'Received model: {model}')
        updatedModel = runModel(model)
        body = updatedModel
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(body)
    }
