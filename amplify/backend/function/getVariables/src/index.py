import json
from getFakeData import getFakeData

def handler(event, context):
    print('received event:')
    print(event)
    
    body = None

    path = event['path']
    if path == "/models":
        body = getFakeData()
    else:
        body = {'var': 'some var'}
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(body)
    }
