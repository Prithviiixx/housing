import json
import io
import smtplib
import csv
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication


def lambda_handler(event, context):
    data = event.get('Records')[0]
    json_data = data.get('body')
    
    json_data = json.loads(json_data)

    sender_email = "@gmail.com"
    password = ""
    
    recipient_email = json_data.get('emailid')
    
    medicine_data = json_data.get('medicine')
    
    subject = "CSV File from Python"
    
    csv_file = io.StringIO()
    fieldnames = medicine_data[0].keys()
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    
    writer.writeheader()
    
    for data in medicine_data:
        writer.writerow(data)
    
    csv_file.seek(0)  # Reset the file pointer to the beginning
    
    # Create the email message
    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = recipient_email
    msg["Subject"] = subject
    
    # Attach the CSV file
    csv_attachment = MIMEApplication(csv_file.getvalue().encode('utf-8'), _subtype="csv", _encoder=lambda x: x)
    csv_attachment.add_header("Content-Disposition", "attachment", filename="data.csv")
    msg.attach(csv_attachment)
    
    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, password)
        server.send_message(msg)
        print("Email with CSV attachment sent successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        server.quit()
    
    return {
        'statusCode': 200,
        'body': json.dumps('Success?')
    }
