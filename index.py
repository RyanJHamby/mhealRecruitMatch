# from RothPeransonMaster.match.RothPeranson import MatchController
from flask import Flask, request, render_template

app = Flask(__name__)
app.debug = True
app.testing = True

@app.route('/',methods = ['POST', 'GET'])
def index():
	return '''<html><h1>hello</h1></html>'''
	# if request.method == 'GET':
	# 	return render_template('index.html',result={})
	# if request.method == 'POST':
	# 	form = request.form
	# 	file_ptr = mhealMatch()
	# 	return render_template('index.html', result=file_ptr)
	# return render_template('index.html',result={})

def mhealMatch():
	# if bool(request.files): 
	# 	team = request.files['TeamRankings'].read()
	# 	applicant = request.files['ApplicantRankings'].read()
	# 	spots = request.files['Spots'].read()
	# 	match = MatchController(team, applicant, spots)
	# 	match.start_match()
	# 	results = match.results_dict()
	# 	return results
		return 2


if __name__ == '__main__':
	app.run()
