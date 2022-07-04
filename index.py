from RothPeransonMaster.match.RothPeranson import MatchController
from flask import Flask, request, render_template

app = Flask(__name__)
app.debug = True
app.testing = True

@app.route('/',methods = ['POST', 'GET'])
def index():
	if request.method == 'GET':
		return render_template('index.html',result={})
	if request.method == 'POST':
		form = request.form
		file_ptr = mhealMatch()
		return render_template('index.html', result=file_ptr)
	return render_template('index.html',result={})

def mhealMatch():
	if bool(request.files): 
		team = request.files['TeamRankings'].read()
		applicant = request.files['ApplicantRankings'].read()
		spots = request.files['Spots'].read()
		match = MatchController(team, applicant, spots)
		results = {}
		if match != "":
			results["error"] = match
			return results
		match_error = match.start_match()
		if match_error != "":
			results["error"] = match_error
			return match_error
		results = match.results_dict()
		return results


if __name__ == '__main__':
	app.run(host="localhost", port=8000, debug=True)
