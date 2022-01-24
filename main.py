from RothPeransonMaster.match.RothPeranson import MatchController
from flask import Flask, render_template, request, json, url_for
from django.core.files.uploadedfile import SimpleUploadedFile
from django import forms
import requests

app = Flask(__name__)

	

class DataInput(forms.Form):
	file = forms.FileField()

@app.route('/',methods = ['POST', 'GET'])
def index():
	if request.method == 'POST':
		form = request.form
		file_ptr = mhealMatch()
		return render_template('index.html', result=file_ptr)
	return render_template('index.html',result={})
	#return send_file(file_pointer, as_attachment=True, attachment_filename="export.csv")

def mhealMatch():
	if bool(request.files): 
		team = request.files['TeamRankings'].read()
		applicant = request.files['ApplicantRankings'].read()
		spots = request.files['Spots'].read()
		match = MatchController(team, applicant, spots)
		match.start_match()
		results = match.results_dict()
		print(results)
		return results
		# match.get_output_csv()


if __name__ == '__main__':
    app.run(debug=True)
