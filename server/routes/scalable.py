import boto3
import json
from flask import Blueprint, request


queue_bp = Blueprint('queue', __name__)

@queue_bp.route('/queue', methods=['POST'])
def add_to_queue():
    
    body = request.data
    message_data = json.loads(body)
    
    sqs = boto3.client('sqs',region_name='eu-west-1')
    queue_url = 'https://sqs.eu-west-1.amazonaws.com/250738637992/properties-queue-x22202625'
    response = sqs.send_message(QueueUrl=queue_url,DelaySeconds=10, MessageBody=json.dumps(message_data))
    
    return {'messageid' : str(response['MessageId'])}
    #return {'messageid' : message_data}