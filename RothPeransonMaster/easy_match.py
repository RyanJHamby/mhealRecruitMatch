
from match.RothPeranson import MatchController

def run_match():
    print("This script uses the files in the easy_match folder.")
    print(
        "You can use them as templates, extending to however many programs/candidates are required."
    )
    print("The filenames cannot be changed or this script will fail to run.")
    print("If you get a KeyError it's likely due to a misspelled Candidate or Program in a ROL.")
    print("\n")

    program_rol = 'Mercy,City,General,State\nChen,Garcia,Beaudry,Beaudry\nGarcia,Hassan,Eastman,Eastman\n,Eastman,Hassan,Anderson\n,Anderson,Anderson,Chen\n,Beaudry,Chen,Hassan\n,Chen,Davis,Feldman\n,Davis,Garcia,Davis\n,Feldman,,Garcia'
    candidate_rol = 'Anderson,Beaudry,Chen,Davis,Eastman,Feldman,Garcia,Hassan\nCity,City,City,Mercy,City,City,City,State\n,Mercy,Mercy,City,Mercy,General,Mercy,City\n,,,General,State,Mercy,State,Mercy\n,,,State,General,State,General,General'
    program_places = 'program,places\nMercy,2\nCity,2\nGeneral,2\nState,2'

    match = MatchController(program_rol, candidate_rol, program_places)
    match.start_match()
    results = match.results_dict()

    print(results)
    match.get_output_csv()

if __name__ == '__main__':
    run_match()