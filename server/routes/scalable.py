import boto3
import json
from flask import Blueprint, request


queue_bp = Blueprint('queue', __name__)

@queue_bp.route('/queue', methods=['POST'])
def add_to_queue():
    
    body = request.data
    message_data = json.loads(body)
    
    sqs = boto3.client(
        'sqs',
        aws_access_key_id='',
        aws_secret_access_key='aN8tY1yTGr+yL52Pk2DWocmWRhZDu9ZFtF41x7Gc',
        aws_session_token='IQoJb3JpZ2luX2VjEGEaCXVzLWVhc3QtMSJHMEUCIAHEeaJ05UXhm8iFrRctk9G58AJ8rLkn6bVIIztuzKb0AiEAjB4rRVIGvOyppZTJUb24naVjvrTTBekbdkECXSv9++sqhAQIiv//////////ARADGgwyNTA3Mzg2Mzc5OTIiDOF1Q2XP2B0kmUCn3CrYA4Pm2jWit328mnXSHfdeYVqCYAp5CrHqCZbBlxATXItVyTpqc779+T8bKVXhs+44MVmpFgZmDmIisndHWCE/AJC7ktlFY6mEJGn9ujyrADHRNDg7yMc43i3iMtYKfxGrJBK6J6oXo3Pz73wJaAFE7sn+XlSxWX0ALx7ojv9BqfXBQbu+5Ol2PVce0Z/uN+MZ2+uIG0NeCPtjVhMNZlZHxM/DzrhTQ89rmsqeY93giraRWwuDnLCpxGGdCfnDyKZdR+btTVqiWRUHvpBXCWSc+onGh7DhSZ7GbWi+fOHZj1wQN9RlC/wopCQokhcu+3XYgh3rAzVlnMf9R+F/ArOnKJqKajEWYz/FMyIeu0/RHlq2HCEwGCVHsoFtGtsQBmwizr1FqHZhrEHsMOOQWAbysUq40GLjdrQ8BwzGG0HGg3aD3fQ2rLQIF69wNb2xXxGENr0gW62imucBSHU1YNPflRuR2i3evCktjTTo1a/B+hRJOONQs4cpvSILWXcQs3Bs0gvSRwRXvUy6sgUMKDKQGHtepGnYtlHOlu+MlnJal/f3urDWcOl6hEKSWAHiANWfF6UVX9u6dzwzVKwzRyqknb7gOS8pkfRCooNwUfWrQ/WCQAZlNr+EB0Awksi5sAY6pgEI+Lip6qJgcHzn07nLCYPDi0vvgvbyvku5W/bsrQNsxEF7shmsskOZDdNSiAG9sR7/ht0nS2DTYvxMDskPJ3oKkPC1ImC+Cmx1X3oCm/I6fNhcEtBa1OY3SwSHJlTrdbYB2NzPwm85ZXJZIG0fuDFIT89kGJ1KObqOkrzmRNwlljo9Y4mnnJ6R3EllEr71O7pfGFrzMp84ZTVpp6d+WFocNZrwTkq1',
        region_name='eu-west-1'
    )
    queue_url = 'https://sqs.eu-west-1.amazonaws.com/250738637992/housing-queue'
    response = sqs.send_message(QueueUrl=queue_url,DelaySeconds=10, MessageBody=json.dumps(message_data))
    
    return {'messageid' : str(response['MessageId'])}
    #return {'messageid' : message_data}