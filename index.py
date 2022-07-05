from RothPeransonMaster.match.RothPeranson import MatchController
from flask import Flask, request, render_template

app = Flask(__name__)
app.debug = True
app.testing = True


@app.route('/', methods=['POST', 'GET'])
def index():
	if request.method == 'GET':
		return render_template('index.html', result={})
	if request.method == 'POST':
		form = request.form
		file_ptr = mhealMatch()
		print(file_ptr)
		return render_template('index.html', result=file_ptr)
	return render_template('index.html', result={})


def mhealMatch():
		# render in results
	results = {}
	if request.files['TeamRankings'].filename == '':
		results['error'] = "Please upload a valid Teams_Ranking_Applicants .csv file"
		return results
	if request.files['ApplicantRankings'].filename == '':
		results['error'] = "Please upload a valid Applicants_Ranking_Teams .csv file"
		return results
	if request.files['Spots'].filename == '':
		results['error'] = "Please upload a valid Team_Places .csv file"
		return results
	team = request.files['TeamRankings'].read()
	applicant = request.files['ApplicantRankings'].read()
	spots = request.files['Spots'].read()
	match = MatchController(team, applicant, spots)
	setup_error = match.organize_candidates(spots)
	if setup_error != "None":
		results["error"] = setup_error
		return results
	match_error = match.start_match()
	if match_error != "None":
		results["error"] = match_error
		return results
	results = match.results_dict()
	return results


if __name__ == '__main__':
	app.run()
